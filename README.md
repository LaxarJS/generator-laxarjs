# LaxarJS generator

> A simple way to create LaxarJS applications and artifacts


## Usage

First you have to install the node modules for [yeoman](http://yeoman.io/):
```
npm install -g yo bower grunt-cli
```

and then install the package with the LaxarJS generator:
```
npm install -g generator-laxarjs
```


## Generators

The Yeoman generator `laxarjs` comes up with the main generator for scaffolding an application and three sub generators for widgets, activities and controls.

Available generators:
- `laxarjs`
- `laxarjs:widget`
- `laxarjs:activity`
- `laxarjs:control`


### Application

To scaffold a new LaxarJS application, create a directory and run the generator:

```console
mkdir my-application
cd my-application
yo laxarjs
```

After answering several questions, the generator creates the bare-bones application scaffolding for you.
Now you can fetch your project's dependencies using `npm install` and start the application development server by running `grunt laxar-develop`.


#### Option Generator

The app generator has one option.

For a custom banner you can pass the path to a file including the banner as option.
The files the generator creates will have this banner.

```console
mkdir my-application
cd my-application
yo laxarjs --banner=my-custom-banner.txt
```

The banner will be saved in the Yeoman configuration file (`.yo-rc.json`) and will be used by the sub-generators.


### Sub-Generators

The sub-generators expect a Yeoman configuration file `.yo-rc.json` in the root directory of the application.
If you created your application using the Yeoman generator as described above, a Yeoman configuration file was already created for you.

If the application has no Yeoman configuration file, just create one by running:

```console
echo {} > .yo-rc.json
```


#### Widget

To generate the scaffold for a LaxarJS widget use the following command:

```console
yo laxarjs:widget
```

The generator creates the new widget in a directory named like the widget.
If the current directory is the root directory of the application, the generator places the new widget into the default directory for widgets, `includes/widgets`.
Otherwise, the widget scaffolding is created within the current directory.


#### Activity

To generate the scaffolding for a LaxarJS activity use either the command

```console
yo laxarjs:activity
```

or use the widget generator with the option `activity`:

```console
yo laxarjs:widget --activity
```

The generator creates the new activity in a directory named like the activity, just as described above for widgets.


#### Control

To generate the scaffolding for a LaxarJS control use the following command:

```console
yo laxarjs:control
```

The generator creates the new control in a directory named by the control.
If the current directory is the root directory of the application, the generator places the new widget into the default directory for controls, `includes/controls`.
Otherwise, a new directory with the scaffolding is created in the current directory.


#### Arguments and Options for Sub-Generators

Each of the three sub-generators accepts the name for the artifact as an argument, the destination path as an option and an option for a custom header.
The following examples are for the widget generator but the others behave accordingly.

You can pass the name for a new widget as an argument from the command line:

```console
yo laxarjs:widget my-widget
```

In this case the generator creates the scaffold in the directory `includes/widgets/my-widget` independently from the working directory.


Using the option `directory`, it is possible to change the destination.
Using this command, the generator creates the files in a directory named by the new widget in the directory `includes/widgets/destination`:

```console
yo laxarjs:widget --directory=includes/widgets/destination
```

It is possible to set the directory option *and* pass the name as argument:

```console
yo laxarjs:widget my-widget --directory=includes/my-app
```

Using this pattern, the full path can be specified when running the generator.
The command above creates the new widget in the directory `includes/my-app/my-widget`.

If you want a custom banner for the files the generator creates, you can pass the path to a file including your banner as option:

```console
yo laxarjs:widget my-widget --banner=my-custom-banner.txt
```
