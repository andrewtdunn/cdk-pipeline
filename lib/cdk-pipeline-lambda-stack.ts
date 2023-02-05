import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda'

export class MyLambdaStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		new Function(this, 'LamdaFunction', {
			runtime: Runtime.NODEJS_12_X,
			handler: 'index.handler',
			code: new InlineCode('exports.handler' = evt: any => "Hello, CDK")
		})
	}
}