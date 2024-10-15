
HYYn vaalitulospalvelu
======================

- Files are served by Amazon S3

- New election results will be stored in S3 by the Electoral System in /year/ folder:
  - result.html (complete results)
  - candidates.json
  - result.json

- See `git show 271b3a6` for an example how to setup a new election year.
  - Copy misc/placeholder-result.html to YYYY/result.html in S3
    by copying the file and running bin/deploy,
    but don't commit it to git under YYYY/result.html to not accidentally overwrite the actual
    result after it has been published.
  - Add generated files from AWS S3 to git immediately after the elections have ended.


## Setup

- Install dependencies:
  - See .ruby-version for VERSION, then
   `rvm install VERSION && cd .. && cd -`
  - `gem install bundler`
  - `bundle install`

- Start Jekyll server for development:
  `bin/serve`

- Setup AWS credentials in `_jekyll_s3.yml`
  - Example of contents: [_jekyll_s3.yml.example](_jekyll_s3.yml.example)
  - Test environment: https://vaalitulos-staging.s3.amazonaws.com/index.html
  - Production environment: http://vaalitulos.hyy.fi/

- Deploy:
  `bin/deploy`

  - Answer [K]eep all when asked about keeping old files:
  `xyz/ is on S3 but not in your _site directory anymore. Do you want to [d]elete, [D]elete all, [k]eep, [K]eep all?`
  - These are eg. old temporary result files, which are in S3 but not in
    this repo.
