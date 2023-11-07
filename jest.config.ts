export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    moduleNameMapper: {
        '\\.(scss|css)$': '<rootDir>/src/app/core/test/__mocks__/styleMock.ts',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/app/core/test/__mocks__/mock.ts',
    },
}