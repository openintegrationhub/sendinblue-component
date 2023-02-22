# <p align="center" width="100%"> <img src="./logo.png" width="250" height="250"> </p>
# <p align="center" width="100%"> SendinBlue API OIH Connector </p>

## Description

A generated OIH connector for the SendinBlue API API (version 3.0.0).

Generated from: https://api.sendinblue.com/v3/swagger_definition.yml <br/>
Generated at: 2023-02-13T09:42:07+01:00 <br/>
Snapshot key:

## Custom changes

Added transformations from/to oih person format for contacts

## API Description

SendinBlue provide a RESTFul API that can be used with any languages. With this API, you will be able to :<br/>
  - Manage your campaigns and get the statistics<br/>
  - Manage your contacts<br/>
  - Send transactional Emails and SMS<br/>
  - and much more...<br/>
<br/>
You can download our wrappers at https://github.com/orgs/sendinblue<br/>
<br/>
**Possible responses**<br/>
  | Code | Message |<br/>
  | :-------------: | ------------- |<br/>
  | 200  | OK. Successful Request  |<br/>
  | 201  | OK. Successful Creation |<br/>
  | 202  | OK. Request accepted |<br/>
  | 204  | OK. Successful Update/Deletion  |<br/>
  | 400  | Error. Bad Request  |<br/>
  | 401  | Error. Authentication Needed  |<br/>
  | 402  | Error. Not enough credit, plan upgrade needed  |<br/>
  | 403  | Error. Permission denied  |<br/>
  | 404  | Error. Object does not exist |<br/>
  | 405  | Error. Method not allowed  |<br/>
  | 406  | Error. Not Acceptable  |<br/>

## Authorization

Supported authorization schemes:
- API Key
 - The API key should be passed in the request headers as `api-key` for authentication.

## Actions

### Return all your created email campaigns

*Tags:* `Email Campaigns`

#### Input Parameters
* `type` - _optional_ - Filter on the type of the campaigns<br/>
    Possible values: classic, trigger.
* `status` - _optional_ - Filter on the status of the campaign<br/>
    Possible values: suspended, archive, sent, queued, draft, inProcess.
* `startDate` - _optional_ - Mandatory if endDate is used. Starting (urlencoded) UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ) to filter the sent email campaigns. Prefer to pass your timezone in date-time format for accurate result ( only available if either 'status' not passed and if passed is set to 'sent' )<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending (urlencoded) UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ) to filter the sent email campaigns. Prefer to pass your timezone in date-time format for accurate result ( only available if either 'status' not passed and if passed is set to 'sent' )<br/>
* `limit` - _optional_ - Number of documents per page<br/>
* `offset` - _optional_ - Index of the first document in the page<br/>

### Create an email campaign

*Tags:* `Email Campaigns`

### Send an email campaign immediately, based on campaignId

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Get an email campaign report

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Delete an email campaign

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the campaign<br/>

### Update an email campaign status

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Export the recipients of an email campaign

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Send the report of a campaign
> A PDF will be sent to the specified email addresses<br/>

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Get a shared template url
> Get a unique URL to share & import an email template from one Sendinblue account to another.<br/>

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign or template<br/>

### Get the list of transactional emails on the basis of allowed filters
> This endpoint will show the list of emails for past 30 days by default. To retrieve emails before that time, please pass startDate and endDate in query filters.<br/>

*Tags:* `SMTP`

#### Input Parameters
* `email` - _optional_ - Mandatory if templateId and messageId are not passed in query filters. Email address to which transactional email has been sent.<br/>
* `templateId` - _optional_ - Mandatory if email and messageId are not passed in query filters. Id of the template that was used to compose transactional email.<br/>
* `messageId` - _optional_ - Mandatory if templateId and email are not passed in query filters. Message ID of the transactional email sent.<br/>
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date (YYYY-MM-DD) from which you want to fetch the list. Maximum time period that can be selected is one month.<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date (YYYY-MM-DD) till which you want to fetch the list. Maximum time period that can be selected is one month.<br/>

### Update an email campaign

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Delete an SMTP transactional log

*Tags:* `SMTP`

#### Input Parameters
* `messageId` - _required_ - MessageId of the transactional log to delete<br/>

### Create an email template

*Tags:* `SMTP`

### Send an email campaign to your test list

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the campaign<br/>

### Get the list of email templates

*Tags:* `SMTP`

#### Input Parameters
* `templateStatus` - _optional_ - Filter on the status of the template. Active = true, inactive = false<br/>
* `limit` - _optional_ - Number of documents returned per page<br/>
* `offset` - _optional_ - Index of the first document in the page<br/>

### Send a template to your test list

*Tags:* `SMTP`

#### Input Parameters
* `templateId` - _required_ - Id of the template<br/>

### Delete an inactive email template

*Tags:* `SMTP`

#### Input Parameters
* `templateId` - _required_ - id of the template<br/>

### Returns the template information

*Tags:* `SMTP`

#### Input Parameters
* `templateId` - _required_ - id of the template<br/>

### Get your transactional email activity aggregated over a period of time

*Tags:* `SMTP`

#### Input Parameters
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date of the report (YYYY-MM-DD). Must be lower than equal to endDate<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date of the report (YYYY-MM-DD). Must be greater than equal to startDate<br/>
* `days` - _optional_ - Number of days in the past including today (positive integer). Not compatible with 'startDate' and 'endDate'<br/>
* `tag` - _optional_ - Tag of the emails<br/>

### Get your transactional email activity aggregated per day

*Tags:* `SMTP`

#### Input Parameters
* `limit` - _optional_ - Number of documents returned per page<br/>
* `offset` - _optional_ - Index of the first document on the page<br/>
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date of the report (YYYY-MM-DD)<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date of the report (YYYY-MM-DD)<br/>
* `days` - _optional_ - Number of days in the past including today (positive integer). Not compatible with 'startDate' and 'endDate'<br/>
* `tag` - _optional_ - Tag of the emails<br/>

### Unblock or resubscribe a transactional contact

*Tags:* `SMTP`

#### Input Parameters
* `email` - _required_ - contact email (urlencoded) to unblock.<br/>

### Update an email template

*Tags:* `SMTP`

#### Input Parameters
* `templateId` - _required_ - id of the template<br/>

### Get the list of blocked or unsubscribed transactional contacts

*Tags:* `SMTP`

#### Input Parameters
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date (YYYY-MM-DD) from which you want to fetch the blocked or unsubscribed contacts<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date (YYYY-MM-DD) till which you want to fetch the blocked or unsubscribed contacts<br/>
* `limit` - _optional_ - Number of documents returned per page<br/>
* `offset` - _optional_ - Index of the first document on the page<br/>
* `senders` - _optional_ - Comma separated list of emails of the senders from which contacts are blocked or unsubscribed<br/>

### Unblock an existing domain from the list of blocked domains
> Unblocks an existing domain from the list of blocked domains<br/>

*Tags:* `SMTP`

#### Input Parameters
* `domain` - _required_ - The name of the domain to be deleted<br/>

### Get all your transactional email activity (unaggregated events)

*Tags:* `SMTP`

#### Input Parameters
* `limit` - _optional_ - Number limitation for the result returned<br/>
* `offset` - _optional_ - Beginning point in the list to retrieve from.<br/>
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date of the report (YYYY-MM-DD). Must be lower than equal to endDate<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date of the report (YYYY-MM-DD). Must be greater than equal to startDate<br/>
* `days` - _optional_ - Number of days in the past including today (positive integer). Not compatible with 'startDate' and 'endDate'<br/>
* `email` - _optional_ - Filter the report for a specific email addresses<br/>
* `event` - _optional_ - Filter the report for a specific event type<br/>
    Possible values: bounces, hardBounces, softBounces, delivered, spam, requests, opened, clicks, invalid, deferred, blocked, unsubscribed.
* `tags` - _optional_ - Filter the report for tags (serialized and urlencoded array)<br/>
* `messageId` - _optional_ - Filter on a specific message id<br/>
* `templateId` - _optional_ - Filter on a specific template id<br/>

### Add a new domain to the list of blocked domains
> Blocks a new domain in order to avoid messages being sent to the same<br/>

*Tags:* `SMTP`

### Send a template
> This endpoint is deprecated. Prefer v3/smtp/email instead.<br/>

*Tags:* `SMTP`

#### Input Parameters
* `templateId` - _required_ - Id of the template<br/>

### Get all the contacts

*Tags:* `Contacts`

#### Input Parameters
* `limit` - _optional_ - Number of documents per page<br/>
* `offset` - _optional_ - Index of the first document of the page<br/>
* `modifiedSince` - _optional_ - Filter (urlencoded) the contacts modified after a given UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ). Prefer to pass your timezone in date-time format for accurate result.<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Delete hardbounces
> Delete hardbounces. To use carefully (e.g. in case of temporary ISP failures)<br/>

*Tags:* `SMTP`

### Get the list of blocked domains

*Tags:* `SMTP`

### Create a contact

*Tags:* `Contacts`

### Get a contact's details

*Tags:* `Contacts`

#### Input Parameters
* `email` - _required_ - Email (urlencoded) of the contact OR its SMS attribute value<br/>

### Delete a contact

*Tags:* `Contacts`

#### Input Parameters
* `email` - _required_ - Email (urlencoded) of the contact<br/>

### List all attributes

*Tags:* `Contacts` `Attributes`

### Update a contact

*Tags:* `Contacts`

#### Input Parameters
* `email` - _required_ - Email (urlencoded) of the contact<br/>

### Update contact attribute

*Tags:* `Contacts` `Attributes`

#### Input Parameters
* `attributeCategory` - _required_ - Category of the attribute<br/>
    Possible values: category, calculated, global.
* `attributeName` - _required_ - Name of the existing attribute<br/>

### Get email campaigns' statistics for a contact

*Tags:* `Contacts`

#### Input Parameters
* `email` - _required_ - Email address (urlencoded) of the contact<br/>
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date (YYYY-MM-DD) of the statistic events specific to campaigns. Must be lower than equal to endDate<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date (YYYY-MM-DD) of the statistic events specific to campaigns. Must be greater than equal to startDate<br/>

### Delete an attribute

*Tags:* `Contacts` `Attributes`

#### Input Parameters
* `attributeCategory` - _required_ - Category of the attribute<br/>
    Possible values: normal, transactional, category, calculated, global.
* `attributeName` - _required_ - Name of the existing attribute<br/>

### Create contact attribute

*Tags:* `Contacts` `Attributes`

#### Input Parameters
* `attributeCategory` - _required_ - Category of the attribute<br/>
    Possible values: normal, transactional, category, calculated, global.
* `attributeName` - _required_ - Name of the attribute<br/>

### Create Contact via DOI (Double-Opt-In) Flow

*Tags:* `Contacts`

### Get all folders

*Tags:* `Contacts` `Folders`

#### Input Parameters
* `limit` - _required_ - Number of documents per page<br/>
* `offset` - _required_ - Index of the first document of the page<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Returns a folder's details

*Tags:* `Contacts` `Folders`

#### Input Parameters
* `folderId` - _required_ - id of the folder<br/>

### Create a folder

*Tags:* `Contacts` `Folders`

### Delete a folder (and all its lists)

*Tags:* `Contacts` `Folders`

#### Input Parameters
* `folderId` - _required_ - Id of the folder<br/>

### Update a folder

*Tags:* `Contacts` `Folders`

#### Input Parameters
* `folderId` - _required_ - Id of the folder<br/>

### Create a list

*Tags:* `Contacts` `Lists`

### Get lists in a folder

*Tags:* `Contacts` `Folders` `Lists`

#### Input Parameters
* `folderId` - _required_ - Id of the folder<br/>
* `limit` - _optional_ - Number of documents per page<br/>
* `offset` - _optional_ - Index of the first document of the page<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Get a list's details

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `listId` - _required_ - Id of the list<br/>

### Get all the lists

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `limit` - _optional_ - Number of documents per page<br/>
* `offset` - _optional_ - Index of the first document of the page<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Update a list

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `listId` - _required_ - Id of the list<br/>

### Delete a contact from a list

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `listId` - _required_ - Id of the list<br/>

### Get contacts in a list

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `listId` - _required_ - Id of the list<br/>
* `modifiedSince` - _optional_ - Filter (urlencoded) the contacts modified after a given UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ). Prefer to pass your timezone in date-time format for accurate result.<br/>
* `limit` - _optional_ - Number of documents per page<br/>
* `offset` - _optional_ - Index of the first document of the page<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Add existing contacts to a list

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `listId` - _required_ - Id of the list<br/>

### Delete a list

*Tags:* `Contacts` `Lists`

#### Input Parameters
* `listId` - _required_ - Id of the list<br/>

### Export contacts
> It returns the background process ID which on completion calls the notify URL that you have set in the input. File will be available in csv.<br/>

*Tags:* `Contacts`

### Get an SMS campaign

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the SMS campaign<br/>

### Returns the information for all your created SMS campaigns

*Tags:* `SMS Campaigns`

#### Input Parameters
* `status` - _optional_ - Status of campaign.<br/>
    Possible values: suspended, archive, sent, queued, draft, inProcess.
* `startDate` - _optional_ - Mandatory if endDate is used. Starting (urlencoded) UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ) to filter the sent sms campaigns. Prefer to pass your timezone in date-time format for accurate result ( only available if either 'status' not passed and if passed is set to 'sent' )<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending (urlencoded) UTC date-time (YYYY-MM-DDTHH:mm:ss.SSSZ) to filter the sent sms campaigns. Prefer to pass your timezone in date-time format for accurate result ( only available if either 'status' not passed and if passed is set to 'sent' )<br/>
* `limit` - _optional_ - Number limitation for the result returned<br/>
* `offset` - _optional_ - Beginning point in the list to retrieve from.<br/>

### Update an SMS campaign

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the SMS campaign<br/>

### Import contacts
> It returns the background process ID which on completion calls the notify URL that you have set in the input.<br/>

*Tags:* `Contacts`

### Creates an SMS campaign

*Tags:* `SMS Campaigns`

### Send your SMS campaign immediately

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the campaign<br/>

### Delete an SMS campaign

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the SMS campaign<br/>

### Update a campaign's status

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the campaign<br/>

### Export an SMS campaign's recipients
> It returns the background process ID which on completion calls the notify URL that you have set in the input.<br/>

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the campaign<br/>

### Send a test SMS campaign

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the SMS campaign<br/>

### Send SMS message to a mobile number

*Tags:* `Transactional SMS`

### Send an SMS campaign's report
> Send report of Sent and Archived campaign, to the specified email addresses, with respective data and a pdf attachment in detail.<br/>

*Tags:* `SMS Campaigns`

#### Input Parameters
* `campaignId` - _required_ - id of the campaign<br/>

### Get your SMS activity aggregated per day

*Tags:* `Transactional SMS`

#### Input Parameters
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date (YYYY-MM-DD) of the report<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date (YYYY-MM-DD) of the report<br/>
* `days` - _optional_ - Number of days in the past including today (positive integer). Not compatible with 'startDate' and 'endDate'<br/>
* `tag` - _optional_ - Filter on a tag<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Get your SMS activity aggregated over a period of time

*Tags:* `Transactional SMS`

#### Input Parameters
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date (YYYY-MM-DD) of the report<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date (YYYY-MM-DD) of the report<br/>
* `days` - _optional_ - Number of days in the past including today (positive integer). Not compatible with startDate and endDate<br/>
* `tag` - _optional_ - Filter on a tag<br/>

### Get all your SMS activity (unaggregated events)

*Tags:* `Transactional SMS`

#### Input Parameters
* `limit` - _optional_ - Number of documents per page<br/>
* `startDate` - _optional_ - Mandatory if endDate is used. Starting date (YYYY-MM-DD) of the report<br/>
* `endDate` - _optional_ - Mandatory if startDate is used. Ending date (YYYY-MM-DD) of the report<br/>
* `offset` - _optional_ - Index of the first document of the page<br/>
* `days` - _optional_ - Number of days in the past including today (positive integer). Not compatible with 'startDate' and 'endDate'<br/>
* `phoneNumber` - _optional_ - Filter the report for a specific phone number<br/>
* `event` - _optional_ - Filter the report for specific events<br/>
    Possible values: bounces, hardBounces, softBounces, delivered, sent, accepted, unsubscription, replies, blocked.
* `tags` - _optional_ - Filter the report for specific tags passed as a serialized urlencoded array<br/>
* `sort` - _optional_ - Sort the results in the ascending/descending order of record creation<br/>
    Possible values: asc, desc.

### Delete a sender

*Tags:* `Senders`

#### Input Parameters
* `senderId` - _required_ - Id of the sender<br/>

### Update a sender

*Tags:* `Senders`

#### Input Parameters
* `senderId` - _required_ - Id of the sender<br/>

### Create a new sender

*Tags:* `Senders`

### Get the list of all your senders

*Tags:* `Senders`

#### Input Parameters
* `ip` - _optional_ - Filter your senders for a specific ip (available for dedicated IP usage only)<br/>
* `domain` - _optional_ - Filter your senders for a specific domain<br/>

### Get all the dedicated IPs for your account

*Tags:* `Senders`

### Get all the dedicated IPs for a sender

*Tags:* `Senders`

#### Input Parameters
* `senderId` - _required_ - Id of the sender<br/>

### Create a webhook

*Tags:* `Webhooks`

### Get a webhook details

*Tags:* `Webhooks`

#### Input Parameters
* `webhookId` - _required_ - Id of the webhook<br/>

### Update a webhook

*Tags:* `Webhooks`

#### Input Parameters
* `webhookId` - _required_ - Id of the webhook<br/>

### Get all webhooks

*Tags:* `Webhooks`

#### Input Parameters
* `type` - _optional_ - Filter on webhook type<br/>
    Possible values: marketing, transactional.
* `sort` - _optional_ - Sort the results in the ascending/descending order of webhook creation<br/>
    Possible values: asc, desc.

### Get a child account's details

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Delete a webhook

*Tags:* `Webhooks`

#### Input Parameters
* `webhookId` - _required_ - Id of the webhook<br/>

### Get the list of all children accounts

*Tags:* `Reseller`

#### Input Parameters
* `limit` - _optional_ - Number of documents for child accounts information per page<br/>
* `offset` - _optional_ - Index of the first document in the page<br/>

### Creates a reseller child

*Tags:* `Reseller`

### Update info of reseller's child based on the child identifier supplied

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Get the status of a reseller's child account creation, whether it is successfully created (exists) or not based on the childIdentifier supplied

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Send a transactional email

*Tags:* `SMTP`

### Update info of reseller's child account status based on the identifier supplied

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Delete a single reseller child based on the child identifier supplied

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or child id of reseller's child<br/>

### Associate a dedicated IP to the child

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Remove Email and/or SMS credits from a specific child account

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Get the personalized content of a sent transactional email

*Tags:* `SMTP`

#### Input Parameters
* `uuid` - _required_ - Unique id of the transactional email that has been sent to a particular contact<br/>

### Get all sender domains for a specific child account

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Dissociate a dedicated IP to the child

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Update the sender domain of reseller's child based on the childIdentifier and domainName passed

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>
* `domainName` - _required_ - Pass the existing domain that needs to be updated<br/>

### Create a domain for a child account

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Get your account information, plan and credits details

*Tags:* `Account`

### Return all the processes for your account

*Tags:* `Process`

#### Input Parameters
* `limit` - _optional_ - Number limitation for the result returned<br/>
* `offset` - _optional_ - Beginning point in the list to retrieve from.<br/>

### Get session token to access Sendinblue (SSO)
> It returns a session [token] which will remain valid for a short period of time. A child account will be able to access a white-labeled section by using the following url pattern => https:/email.mydomain.com/login/sso?token=[token]<br/>

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Upload an image to your account's image gallery

*Tags:* `Email Campaigns`

### Return the informations for a process

*Tags:* `Process`

#### Input Parameters
* `processId` - _required_ - Id of the process<br/>

### Add Email and/or SMS credits to a specific child account

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>

### Get an A/B test email campaign results
> Obtain winning version of an A/B test email campaign<br/>

*Tags:* `Email Campaigns`

#### Input Parameters
* `campaignId` - _required_ - Id of the A/B test campaign<br/>

### Delete the sender domain of the reseller child based on the childIdentifier and domainName passed

*Tags:* `Reseller`

#### Input Parameters
* `childIdentifier` - _required_ - Either auth key or id of reseller's child<br/>
* `domainName` - _required_ - Pass the existing domain that needs to be deleted<br/>

## License

: sendinblue-component<br/>
                    <br/>

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
