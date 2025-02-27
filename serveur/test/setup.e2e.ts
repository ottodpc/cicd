import { INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { StartedTestContainer } from 'testcontainers'
import { AppModule } from './../src/app.module'
import { MongoDBContainer } from '@testcontainers/mongodb'

const CLASS_NAME: string = 'setup.e2e'

let dbContainer: StartedTestContainer

beforeAll(async () => {
	// Perform setup actions here
	// This will run once before any test suites

	dbContainer = await new MongoDBContainer('mongo:6.0.1').start()
	const mappedMongoPort = dbContainer.getMappedPort(27017)
	process.env.MONGO_PORT = mappedMongoPort.toString()

	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile()

	const app = moduleFixture.createNestApplication({
		logger: ['error', 'warn', 'log', 'debug', 'verbose'],
	})

	process.env.AUTHENTICATION_ENABLED = false

	await app.init()
	global.app = app
})

afterAll(async () => {
	// Perform teardown actions here
	// This will run once after all test suites
	if (global.app) {
		await global.app.close()
	}

	// Stop and cleanup the Kafka and Zookeeper containers

	if (dbContainer) {
		await dbContainer.stop()
	}
})
