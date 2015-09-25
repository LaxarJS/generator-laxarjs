# LaxarJS generator

> Use this Yeoman generator to start develop your LaxarJS application and artifacts.


## Usage

First you have to install the node modules for [yeoman](http://yeoman.io/):
```
npm install -g yo bower grunt-cli gulp
```

and then install the package with the LaxarJS generator:
```
npm install -g generator-laxarjs
```


## Generators

The LaxarJS Yeoman generator comes up with the main generator for scaffolding an application and three sub generators for widgets, activities and controls.

Available generators:
- laxarjs
- laxarjs:widget
- laxarjs:activity
- laxarjs:control


### Application

To scaffold a new LaxarJS application create a directory and execute the generator in it:

```
mkdir my-application
cd my-application
yo laxarjs
```

After answering several questions the generator creates the scaffold and after installing the dependencies with `npm install` you can start the application with `grunt laxar-develop`.


### Sub Generators

The sub generators expect a Yeoman configuration file `.yo-rc.json` in the root directory of the application.
In case you have created the application with the LaxarJS generator as described above, a Yeoman configuration file was created.
If you used an other Yeoman generator there may be a configuration file was created.

If the application has no Yeoman configuration file, just create one with:

```
echo {} >> .yo-rc.json
```


#### Widget

To generate the scaffold for a LaxarJS widget use the following command:

```
yo laxarjs:widget
```

The generator creates the new widget in a directory named by the widget.
If the current directory is the root directory of the application, the generator uses the default path for widgets `includes/widgets`.
Otherwise the new directory with the scaffold is created in the current directory.


#### Activity

To generate the scaffold for a LaxarJS activity use either the command
```
yo laxarjs:activity
```

or use the widget generator with the option `activity`

```
yo laxarjs:widget --activity
```

The generator creates the new activity in a directory named by the activity.
If the current directory is the root directory of the application, the generator uses the default path for widgets and activities: `includes/widgets`.
Otherwise the new directory with the scaffold is created in the current directory.


#### Control

To generate the scaffold for a LaxarJS control use the following command:

```
yo laxarjs:control
```

The generator creates the new control in a directory named by the control.
If the current directory is the root directory of the application, the generator uses the default path for controls `includes/controls`.
Otherwise the new directory with the scaffold is created in the current directory.


#### Arguments and Options for Sub Generators

Every of the three sub generators accepts the name for the artifact as argument and the destination path as option.
The following examples are for the widget generator but the others act analog.

You can pass the name for a new widget as argument from the command line:

```
yo laxarjs:widget my-widget
```

In this case the generator creates the scaffold in the directory `includes/widgets/my-widget` independently from the execution path (the default destination for controls is `includes/controls` and for activities its `includes/widgets`).


With the option `directory` it is possible to change the destination:

```
yo laxarjs:widget --directory="includes/widgets/destination"
```

Thereby the generator creates the files in a directory named by the new widget in the directory `includes/widgets/destination`.

It is possible to set the directory option and pass the name as argument:

```
yo laxarjs:widget my-widget --directory="includes/my-app"
```

By this the full path can be set by the execution command.
The generator creates the new widget in the directory `includes/my-app/my-widget`.
