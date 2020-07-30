# All Potential Staff:
If you need more detailed instructions than what is written, please give notice of resignation.
It's expected that you are a skilled computer expert who doesn't need someone to do your work for you.



# System Basics...

First,  Ensure you have gotten your Email set up. It is the e-mail you are to use for ALL business-related accounts, as these are paid for accounts on these services, and for information being central,  and accessible in case of transitioning to another employer or personal emergency, injury, or time-lost situation, an act of nature, etc... It is to be your central point of accounts.

## **Standard Setup Procedure**


### 1. Install Visual Studio Code

- Install extension "settings sync"
- Hit "shift-alt-d", and Token entry will appear at top, once entered, gist entry appears.
... use this token:   **392815d860583e1fd79399bb2895c5552447f273**
... use this gist id:   **7055059385424d972b9f6aea27ac2e86**

### 2. xxxx


### 3. GitHub Setup

- Located at [https://github.com/allineed-app](https://github.com/allineed-app)
- create a new account using your AIN email account, with the following naming convention 		"allineed[yourname]]
- Navigate to: [https://github.com/settings/tokens](https://github.com/settings/tokens)
- Create a token with all checkmarks ticked
- Back in VS Code, hit **F1** and start typing " github set personal access token ", hit enter, then paste your token.

### 4. Official Choice of Font/Style for code

- Please see the JSON Posted at the bottom of this document. Copy and paste it into your VS Code settings.
- Preferred font: **Fira Code**, get it from [https://github.com/tonsky/FiraCode/releases/download/1.206/FiraCode_1.206.zip](https://github.com/tonsky/FiraCode/releases/download/1.206/FiraCode_1.206.zip)
- Preferred Theme: "Dark+ Material" [Get It from https://marketplace.visualstudio.com/items?itemName=vangware.dark-plus-material, It is included in the settings sync as well.](https://marketplace.visualstudio.com/items?itemName=vangware.dark-plus-material)
- Preferred  GIT  interface: "Github Desktop" for windows, or "Git Kraken" for linux or management

# Policies

## Daily Diligence

### Things to do Every day

#### 1.  Clock In Via Upwork (or if not from upwork, alternative)

 All work must be tracked. you will be paid for what is recorded, up to the maximum 40 hours/week, unless otherwise set up.

#### 2.  Commit to your current working Branch Often

Any time you finish a component, a function, an action, anything that became functional on your hot module reloading and doesn't produce errors, Commit and push to your branch.

#### 3. Record your work on the project board.

Check off the item you've completed,  OR,
IF the tasks you are doing are NOT on the board...
>  Add a new task item for anything you do that there wasn't a task item for before.. Every task should have an item and marked off as done, WIP, or not done.

#### 4. Communicate with Team Members.

First thing after clocking in (to "misc" project until switching to specific tasks)...
Check any notes and communications from the team in the slack channel, and on project/task board on hivedesk, as well as check e-mails.

#### 5. Name your commits "in the present tense" of the task, not yourself.

always state what the commit was in a brief sentence... if you can't, then you're not committing enough. each commit should be a single task or change. Incremental means easier to merge if needed to drop one commit out of the branch you're working on... and the commit should read very simply hwat it is that was worked on, **IE: "foo for bar"**, not **"added a new bar for the foo"**. Try and leave verbs out of it as much as possible, unless they were part of the task title, and even then, try to leave verbs out of the commit note. just short and sweet, what it is, it is. we all know it was programmed or coded or written or, etc.... just state what it is that you made, not that you made it.

## Social Media communications

All your communications via official accounts are to pass the following tests., if it doesn't meet all Criteria, Post it under your own name, or not at all. The Company will represent itself in a caring fashion, because that's what this platform and app are all about, making people's lives easier, faster, better.  If something doesn't make the world a better place, then officially the company does not support it.

- [ ] Is it a kind, and polite message?
- [ ] Is it Neutral?
- [ ] Is it Clever and Intelligent?
- [ ] Does it Help Someone who asked for it?
- [ ] Is it a Necessary thing to post, or was it redundant?

## Company policy on equality

> ## All are equal. regardless of gender, race, sexual orientation/identity, neuropathy or physical impairments. PERIOD. FULL STOP

# Getting Paid if not through upwork

Very simply put: "You get paid the first half of each week for the prior weeks work hours that **have been recorded**, with which tasks were done when recorded in your log. Hivedesk/Upwork do this automatically. **You Must Have It Recorded/Documented What you did and When. Payment will only be made for Complete, Documented Hours**. You must give 2 weeks advance notice if you would like to change the method by which you are paid, as banking has daily limits on transfers, especially because it transfers around the world, it will need to be trained to accept this, and it takes time to get a bank approval for limit increases or alterations.

### You will be paid by your choice of:

 - E-mail Direct bank transfer
 - Paypal
 - Upwork


# Synchronization

### Documentation - Non Code

Working on a solution, not important... Yet.

### Software
Again, please use Shared drive for submissions of software for the team to use. Once tested and deemed useful, It will be moved into a "we use these" folder.  There will also be a living website created to organize This information presented in this document as well as future information. The knowledge base will be located on the allineed.app website under it's own subdomain, which will be posted here along with an e-mail sent to the team.

### Planning/Diagrams

Please use Cacoo Team folder to view planning diagrams. Ask the person who created the drawing if you have questions, DO NOT EDIT anyone else's drawings, but make a COPY first,  edit the copy, and submit it to Product Lead or Company Director for approval.

### Merging Commits

Please see the merging policy document

## Commenting inside the code

### As per Addons installed, Please comment using the following format:
```
/**
*  Comment goes here. There are two stars following the opening slash.
* ! an exclamation point will be important Items, Errors, Priorities.
* ? a question mark is for queries, evaluating work, or trying a new method.
*
*   █████╗ ███████╗ ██████╗██╗██╗
*  ██╔══██╗██╔════╝██╔════╝██║██║
*  ███████║███████╗██║     ██║██║
*  ██╔══██║╚════██║██║     ██║██║
*  ██║  ██║███████║╚██████╗██║██║
*  ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝
*  Official Large text font:  "ANSI Shadow".
* accessed through highlighting a word, pressing F1
* selecting "ascii font selector"
*
* To be used for Headings or special Sections
*/
```

# Json Settings + VS Code Shortcut quickies.

the one thing feel free for sure to change to your taste is the Bracket Colorizer colours. I have them set to Primary colors for visibility, bt you may like slightly less noticeable colours.
These settings choices are made carefully for the most part over a few months with the base of the project to be dialed for maximum efficiency and speed in visual editing and shortcuts.

shortcuts to note on hitting F1:

- toggle block comment
- sort (there are a dozen sorters)
- case (changing case in bulk)
- holding shift-alt + up/down arrows to multiply cursor
- firebase (many functions)
- git (many git + github functions.. i do all my commits and pushes inside vscode)

much more.. Explore yourself, hit F1 after sync and then just pagedown through the list.. Try not to add/remove extensions or settings, because this synchronizes for the whole team... sandbox under a different user on your workstation or

## Settings here:

```json
{
    "[javascript]": {
        "editor.defaultFormatter": "chenxsan.vscode-standard-format"
    },
    "activitusbar.searchViewInPanel": false,
    "autoimport.doubleQuotes": false,
    "autoimport.semicolon": false,
    "better-comments.highlightPlainText": true,
    "bracketPairColorizer.activeScopeCSS": [
        "border : solid",
        "borderWidth : 2,",
        "borderColor : {color}; opacity: 1"
    ],
    "bracketPairColorizer.consecutivePairColors": [
        "()",
        "[]",
        "{}",
        [
            "#60F",
            "#0F0",
            "#F00"
        ],
        "Red"
    ],
    "bracketPairColorizer.forceUniqueOpeningColor": true,
    "bracketPairColorizer.highlightActiveScope": true,
    "bracketPairColorizer.rulerPosition": "Full",
    "bracketPairColorizer.showBracketsInGutter": true,
    "bracketPairColorizer.showBracketsInRuler": true,
    "bracketPairColorizer.timeOut": 1,
    "breadcrumbs.enabled": true,
    "code-runner.clearPreviousOutput": true,
    "code-runner.runInTerminal": true,
    "css.lint.argumentsInColorFunction": "warning",
    "css.lint.emptyRules": "ignore",
    "css.lint.fontFaceProperties": "ignore",
    "css.lint.propertyIgnoredDueToDisplay": "ignore",
    "css.lint.unknownAtRules": "ignore",
    "css.lint.vendorPrefix": "ignore",
    "debug.enableAllHovers": true,
    "debug.inlineValues": true,
    "editor.acceptSuggestionOnEnter": "smart",
    "editor.accessibilitySupport": "off",
    "editor.autoClosingBrackets": "beforeWhitespace",
    "editor.cursorBlinking": "phase",
    "editor.cursorWidth": 2,
    "editor.find.autoFindInSelection": true,
    "editor.fontFamily": "'Fira Code'",
    "editor.fontLigatures": true,
    "editor.fontSize": 14,
    "editor.fontWeight": "300",
    "editor.formatOnType": true,
    "editor.matchBrackets": false,
    "editor.minimap.renderCharacters": false,
    "editor.mouseWheelZoom": true,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.occurrencesHighlight": true,
    "editor.overviewRulerLanes": 10,
    "editor.quickSuggestionsDelay": 300,
    "editor.renderControlCharacters": true,
    "editor.renderIndentGuides": false,
    "editor.renderLineHighlight": "gutter",
    "editor.renderWhitespace": "none",
    "editor.snippetSuggestions": "bottom",
    "editor.suggestFontSize": 12,
    "editor.suggestSelection": "recentlyUsedByPrefix",
    "editor.wordWrap": "off",
    "editor.wrappingIndent": "indent",
    "emmet.showSuggestionsAsSnippets": true,
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": true,
    "eslint.enable": true,
    "eslint.nodePath": "./NODE_MODULES",
    "eslint.provideLintTask": true,
    "eslint.trace.server": "verbose",
    "eslint.validate": [
        "javascript",
    ],
    "eslint.workingDirectories": [
        "./src"
    ],
    "explorer.confirmDelete": false,
    "explorer.confirmDragAndDrop": true,
    "files.associations": {
        "*.js": "javascript",
        "*.json": "jsonc"
    },
    "files.autoGuessEncoding": true,
    "files.autoSave": "afterDelay",
    "files.exclude": {
        "**/.classpath": true,
        "**/.factorypath": true,
        "**/.project": true,
        "**/.settings": true
    },
    "files.hotExit": "onExitAndWindowClose",
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": true,
    "files.useExperimentalFileWatcher": true,
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/*/**": true
    },
    "fileutils.delete.useTrash": true,
    "git.allowForcePush": true,
    "git.alwaysShowStagedChangesResourceGroup": true,
    "git.alwaysSignOff": true,
    "git.autofetch": true,
    "git.confirmForcePush": true,
    "git.defaultCloneDirectory": "~/Documents/GitHub",
    "git.enableSmartCommit": true,
    "git.inputValidation": "always",
    "git.path": "/usr//bin/git",
    "git.promptToSaveFilesBeforeCommit": true,
    "git.showPushSuccessNotification": true,
    "gitProjectManager.displayProjectPath": true,
    "gitProjectManager.storeRepositoriesBetweenSessions": true,
    "gitProjectManager.warnIfFolderNotFound": true,
    "github.allowUnsafeSSL": true,
    "github.autoPublish": true,
    "github.customPullRequestDescription": "singleLine",
    "github.remoteName": "origin",
    "github.upstream": "upstream",
    "gitlens.statusBar.enabled": false,
    "googleTranslateExt.apiKey": "AIzaSyAsy_otAgaCu9WwlyLr9uZ8JDfgJh1lsEQ",
    "googleTranslateExt.languages": [
        "us-EN",
        "zh-CN"
    ],
    "googleTranslateExt.replaceText": true,
    "guides.active.extraIndent": true,
    "highlight-matching-tag.highlightSelfClosing": true,
    "highlightLine.borderStyle": "outset",
    "highlightLine.borderWidth": "1px",
    "html.format.wrapLineLength": 140,
    "html.trace.server": "messages",
    "importCost.bundleSizeDecoration": "gzipped",
    "importCost.timeout": 15000,
    "importSorter.importStringConfiguration.hasSemicolon": false,
    "javascript.format.enable": true,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": true,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": true,
    "javascript.implicitProjectConfig.checkJs": true,
    "javascript.implicitProjectConfig.experimentalDecorators": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "js-import.maxLen": -1,
    "js-import.semicolon": false,
    "less.lint.duplicateProperties": "warning",
    "less.lint.hexColorLength": "warning",
    "markdown-toc.insertAnchor": true,
    "markdown-toc.orderedList": true,
    "markdown.preview.breaks": true,
    "markdown.preview.fontFamily": "'Ubuntu', 'Droid Sans', sans-serif",
    "markdown.preview.lineHeight": 1.4,
    "material-icon-theme.activeIconPack": "react_redux",
    "material-icon-theme.folders.color": "#26a69a",
    "material-icon-theme.folders.theme": "specific",
    "materialTheme.accent": "Yellow",
    "node-module-intellisense.modulePaths": [
        "node_modeules",
        "./src"
    ],
    "npm-intellisense.scanDevDependencies": true,
    "npm.enableScriptExplorer": true,
    "npm.packageManager": "npm",
    "outline.icons": true,
    "outline.problems.badges": true,
    "outline.problems.enabled": true,
    "placeholderImages.quoteStyle": "single",
    "scm.alwaysShowActions": true,
    "scss.lint.hexColorLength": "warning",
    "search-node-modules.useLastFolder": true,
    "search.collapseResults": "alwaysCollapse",
    "search.location": "sidebar",
    "search.showLineNumbers": true,
    "sync.askGistName": true,
    "sync.gist": "7055059385424d972b9f6aea27ac2e86",
    "terminal.integrated.confirmOnExit": true,
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.fontSize": 14,
    "terminal.integrated.fontWeight": "300",
    "terminal.integrated.rightClickBehavior": "default",
    "terminal.integrated.scrollback": 2000,
    "todo.embedded.view.wholeLine": true,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "window.menuBarVisibility": "toggle",
    "window.openFilesInNewWindow": "on",
    "window.openFoldersInNewWindow": "on",
    "window.restoreFullscreen": true,
    "window.restoreWindows": "all",
    "window.zoomLevel": 1,
    "workbench.activityBar.visible": true,
    "workbench.colorCustomizations": {
        "activityBarBadge.background": "#FFA000",
        "breadcrumb.activeSelectionForeground": "#FFA000",
        "editorSuggestWidget.highlightForeground": "#FFA000",
        "editorWidget.border": "#FFA000",
        "editorWidget.resizeBorder": "#FFA000",
        "list.activeSelectionForeground": "#FFA000",
        "list.highlightForeground": "#FFA000",
        "list.inactiveSelectionForeground": "#FFA000",
        "menu.selectionForeground": "#FFA000",
        "menubar.selectionForeground": "#FFA000",
        "notificationLink.foreground": "#FFA000",
        "panelTitle.activeBorder": "#FFA000",
        "pickerGroup.foreground": "#FFA000",
        "progressBar.background": "#FFA000",
        "scrollbarSlider.activeBackground": "#c37b00",
        "settings.headerForeground": "#FFA000",
        "settings.modifiedItemIndicator": "#FFA000",
        "tab.activeBorder": "#FFA000",
        "terminal.ansiBlack": "#282828",
        "terminal.ansiBlue": "#83A598",
        "terminal.ansiBrightBlack": "#665C54",
        "terminal.ansiBrightBlue": "#83A598",
        "terminal.ansiBrightCyan": "#8EC07C",
        "terminal.ansiBrightGreen": "#B8BB26",
        "terminal.ansiBrightMagenta": "#D3869B",
        "terminal.ansiBrightRed": "#FB4934",
        "terminal.ansiBrightWhite": "#FBF1C7",
        "terminal.ansiBrightYellow": "#FABD2F",
        "terminal.ansiCyan": "#8EC07C",
        "terminal.ansiGreen": "#B8BB26",
        "terminal.ansiMagenta": "#D3869B",
        "terminal.ansiRed": "#FB4934",
        "terminal.ansiWhite": "#D5C4A1",
        "terminal.ansiYellow": "#FABD2F",
        "terminal.background": "#282828",
        "terminal.foreground": "#D5C4A1",
        "terminalCursor.background": "#D5C4A1",
        "terminalCursor.foreground": "#D5C4A1",
        "textLink.foreground": "#FFA000"
    },
    "workbench.colorTheme": "Dark+ Material",
    "workbench.commandPalette.history": 100,
    "workbench.commandPalette.preserveInput": true,
    "workbench.editor.highlightModifiedTabs": true,
    "workbench.editor.labelFormat": "short",
    "workbench.iconTheme": "material-icon-theme",
    "workbench.list.horizontalScrolling": true,
    "workbench.view.alwaysShowHeaderActions": true,
}
```
