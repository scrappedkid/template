# Important

all the files in the root DIR are for a reason..
Leave semantic fix stuff alone.
Do NOT change or delete any root files
Checking and know what is what first

if you want to check something, make a new branch,
test it there locally, then put to staging,
if staging passes, submit pull req.
No pulls to the master branch without 100% test passes

## MASTER

### Pull request requirement Pre merge

> All of the below must be met before merging into master.
rules to apply from small team through large company.

[x] - Executive Approved (CEO/CTO,Owner) - Currently Kai Gouthro.
[x] - Project manager or product Lead Approved
[x] - Team leader approved - (not applicable in phase 1 yet)
[x] - In Staging -> 100% pass in tests that have been written (if there are any)
[x] - In Staging -> Pass in Circle CI
[x] - In Staging -> Pass in Any other CImethods as per current CI services we use.

## STAGING

### Merge requirement

[x] - Project manager or product Lead Approved
[x] - Team leader approved - (not applicable in phase 1 yet)
[x] - 100% pass in LOCALHOST run tests that have been written (if there are any)
