import { Construct } from 'constructs';
import { PennLabsChart, ReactApplication } from '@pennlabs/kittyhawk';

export class ProductionChart extends PennLabsChart {
  constructor(scope: Construct) {
    super(scope)

    const image = 'pennlabs/website'
    const domain = 'pennlabs.org'

    new ReactApplication(this, 'serve', {
      deployment: {
        image,
      },
      domain: {
        host: domain,
        paths: ['/'],
      },
    })
  }
}
