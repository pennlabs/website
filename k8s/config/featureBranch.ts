import { Construct } from 'constructs';
import { PennLabsChart, ReactApplication } from '@pennlabs/kittyhawk';

export class FeatureBranchChart extends PennLabsChart {
  constructor(scope: Construct) {
    super(scope)

    const prNumber = process.env.PR_NUMBER;
    
    // Arbitrary change
    if (!prNumber) {
      console.error("No PR_NUMBER environment variable provided.");
      process.exit(1);
    }

    const image = 'pennlabs/website'
    const domain = `pr-${prNumber}.pennlabs.org`

    new ReactApplication(this, 'serve', {
      deployment: {
        image,
      },
      domain: {
        host: domain,
        paths: ['/'],
        isSubdomain: true,
      },
    })
  }
}