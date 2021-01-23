import { Construct } from "constructs";
import { App, Stack, Workflow } from "cdkactions";
import { DeployJob, ReactProject } from "@pennlabs/kraken";

export class WebsiteStack extends Stack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    const workflow = new Workflow(this, 'build-and-deploy', {
      name: 'Build and Deploy',
      on: 'push',
    });

    const websiteJob = new ReactProject(workflow, {
      imageName: 'website',
    });

    new DeployJob(workflow, {}, {
      needs: [websiteJob.publishJobId]
    });
  }
}

const app = new App();
new WebsiteStack(app, 'website');
app.synth();
