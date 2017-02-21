const GitHubApi = require('github')
const readPackage = require('read-pkg')
const parseGithubUrl = require('parse-github-url')

const defaultGithubApiOptions = {
	debug: false,
	protocol: 'https',
	host: 'api.github.com',
	headers: {},
	followRedirects: false,
	timeout: 5000
}

module.exports = ({ authenticate, options = {} }) => {
	const actualOptions = Object.assign({}, defaultGithubApiOptions, options)
	actualOptions.headers['user-agent'] = 'npm-description-github'
	actualOptions.headers['Accept'] = 'application/vnd.github.v3+json'

	const github = new GitHubApi(actualOptions)
	github.authenticate(authenticate)

	return packagePath => {
		return readPackage(packagePath)
			.then(({ repository, description }) => {
				const url = parseGithubUrl(repository.url || repository)

				return github.repos.edit({
					owner: url.owner,
					name: url.name,
					repo: url.name,
					description
				})
			})
	}
}
