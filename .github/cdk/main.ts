import { Construct } from 'constructs'
import { App, Stack, Workflow } from 'cdkactions'
import { DeployJob, NukeJob, ReactProject } from '@pennlabs/kraken'

export class WebsiteStack extends Stack {
  constructor(scope: Construct, name: string) {
    super(scope, name)
    const workflow = new Workflow(this, 'build-and-deploy', {
      name: 'Build and Deploy',
      on: 'push',
    })

    const websiteJob = new ReactProject(workflow, {
      imageName: 'website',
      publishProps: {
        push: "${{ github.ref == 'refs/heads/master' || startsWith(github.ref, 'refs/heads/feat/') == true }}"
      }
    })

    // Add Production Deploy
    new DeployJob(
      workflow,
      {
        deploymentUrls: ["pennlabs.org"]
      },
      {
        needs: [websiteJob.publishJobId],
      },
    )

    // Add Feature Branch Deploy to Original Workflow
    new DeployJob(
      workflow,
      {
        deployToFeatureBranch: true,
      },
      {
        needs: [websiteJob.publishJobId],
      },
    )

    // Create Feature Branch Nuke Worflow
    const featureBranchNukeWorkflow = new Workflow(
      this,
      'feature-branch-nuke',
      {
        name: 'Feature Branch Nuke',
        on: { pullRequest: { types: ['closed'] } },
      },
    )
    new NukeJob(featureBranchNukeWorkflow, {}, {})
  }
}

const app = new App()
new WebsiteStack(app, 'website')
app.synth()
