import { Construct } from 'constructs';
import { App } from 'cdk8s';
import { PennLabsChart, ReactApplication } from '@pennlabs/kittyhawk';

export class MyChart extends PennLabsChart {
  constructor(scope: Construct) {
    super(scope);

    const image = 'pennlabs/website';
    const domain = 'pennlabs.org';

    new ReactApplication(this, 'serve', {
      deployment: {
        image,
      },
      domain: { 
        host: domain, 
        paths: ['/'], 
      },
    });
  }
}

const app = new App();
new MyChart(app);
app.synth();
