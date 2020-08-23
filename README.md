## What is Qat?
Qat is Node Cli Tool for quickly automate coding tasks using command line
**Q A T** = **Q**uickly **A**utmate **T**ask

## How to get started?

 1. run `npm i -g qat`
 2. add **qat-config.js** file to the root directory of the project, and start writing your custom configuration
 3. run `qat your-custom-command`
 4. watch the magic happen :clap: :sparkles:

## Exapmles

 - a simple task for adding tow numbers, and log the the result

```javascript
module.exports = {
	tasks: [
		{
			command: 'sum num1 num2',
			run: ({ _num1, _num2, log }) => {
				log(+_num1 + +_num2)
			}
		}
	]
}
```
then run `qat sum 1 3` in the command line, `4` will be printed



 - a task for committing changes
```javascript
module.exports = {
	tasks: [
		{
			command: 'commit message',
			run: async ({ _message, execute, log }) => {
				await execute([
					'git add .',
					`git commit -m "${message}"`,
					'git push origin master'
				])
				log('changes successfully committed',  'green')
			}
		}
	]
}
```
when you run `qat commit 'some commit message'` it will automaticly add the changes, commit it, and push it to the origin remote, then it will print a green color message  "changes successfully committed".



 - a task for automaticly generate a commponent folder and starter files
```javascript
module.exports = {
	tasks: [
		{
			command: 'add-component componentName',
			run: async ({ _componentName, createFolder, createFile, log }) => {
				const folderPath = `./src/components/${_componentName}`
				const compoPath = folderPath + `/${_componentName}.jsx`
				const stylesPath = folderPath + `/${_componentName}.css`
				
				await createFolder(folderPath)
				await createFile(compoPath, '')
				await createFile(stylesPath, '')
				
				log(`${_componentName} added successfully`,  'green')
			}
		}
	]
}
```
then run `qat add-component header` 
it will automaticly generate the *Header* component directory, and its styles files with the content provided as the second argument of *createFile* function,  then it will print a green color message  "Header added successfully".

## Task object
every task object contains the `command` property and `run` method
 1. `command` property contains tow parts: the *command name* ( sum ) and the *command arguments* ( num1, num2 )
the command arguments will passed as properties of the first argument of the *run* method with underscore at the begining ( _num1, _num2 )

 2. `run` method is the function will be execute when the command get run, the method accept one object argument that contains many properties ( command agruments, and cwd ), and methods ( log, execute, createFile ... )

 

 - properties
-- command arguments: ( _commitMessage for exapmle ), ulimited number of arguments can be added.
-- cwd: current working directory

- methods:
	**log**: it is a replacement of console.log, but with tow more arguments, the color of the printed message, and the color of it background
print( message, message-color, message-bg-color)
	--*exapmle*: `log("hello world!", "yellow", "blue")`
	--*colors*: ( black, red, green, yellow, blue, magenta, cyan, white, crimson )

	**createFolder**: create a folder/directory with the given path
	--*exapmle*: `await createFolder('./src')`
	
	**createFile**: create a file with the given path and content
	--*exapmle*: `await createFile('./message.txt', 'Hi there')`
	
	**getFileContent**: get file content by its path
	--*exapmle*: 
	```javascript 
	const message = await getFileContent('./message.txt')
	log(message) // "hi there" will be printed
	```
