# Rocket.Chat ADO Bot
> A simple bot to open tickets in Azure DevOps or Jira and search the Wiki/Confluence!

## Configure
Use `sample.json` configuration file to find a sample of the configuration.
Copy the file and put it under `config/default.json` with your real configuration.
### ado
For "`ado.pat`" value, you need to configure a "Personal Access Token" in Azure DevOps ([help](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows)) with:
* Wiki - Read
* Work Items - Read, Write

### Jira
For "`jira.token`" value, you need to configure an access token ([help](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/))
## Build
`docker build . -t rocketadobot`

## Run
 `docker run -it -v /mnt/c/projects/RocketBot/config:/app/config -v /mnt/c/projects/RocketBot/dod:/data/dod rocketadobot`

 ## More information
 For more information you can ask for "help" to the bot or "dev_help"

## Contributing
1. Fork it (<https://github.com/javitolin/rocket_adobot/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Meta
[AsadoDevCulture](https://AsadoDevCulture.com) 
[@jdorfsman](https://twitter.com/jdorfsman)
Distributed under the MIT license.