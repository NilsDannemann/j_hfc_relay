# HFC Relay - Readme

In progress.


# The Grid
The Grid uses flexible sass-mixins instead of fixed classes.<br>

This approach has the following advantages over conventional grids:<br>

- **Flexibility** - just pass any ```$fraction``` and ```$gutter``` you like
- **Cleanliness** - keep your Markup clean and readable
- **Simplicity** - keep all styles in one place (no separation of concerns)

###Basic Examples

```sass
@include column('1/4');
@include column('2/9');
@include column('14/23');
```

###Adding Gutters

By default a column has no gutters. You can add gutters like so:

```sass
@include column('1/4', $gutter: true); 		// adds global gutters (use: 'true' or 'basic')
@include column('1/4', true); 				// shorthand 
```
**Note:** This uses the global ```$whitespace``` variable for gutters.

You can also specify your own gutters like so:
```sass
@include column('1/4', $gutter: 10px); 		// adds px gutters
@include column('1/4', $gutter: 2em); 		// adds em gutters
@include column('1/4', $gutter: 3%); 		// adds % gutters
@include column('1/4', $gutter: $var); 		// you can also use sass-variables
@include column('1/4', $gutter: $var/2); 	// you can even do math with them
```

###Play with it
You can test the mixins over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Grid-Playground](http://codepen.io/NilsDannemann/pen/NGwmqq?editors=110)


#Responsive Workflow
Four sets of sass-mixins let you control the responsive flow of your document:

- **Above** a certain breakpoint (``` @include above(breakpoint-name) { ... } ```)
- **Below** a certain breakpoint (``` @include below(breakpoint-name) { ... } ```)
- **At** a certain breakpoint (``` @include at(breakpoint-name) { ... } ```)
- **From** a certain breakpoint (``` @include from(breakpoint-name, breakpoint-name) { ... } ```)

###Basic Examples

**Above** a certain breakpoint (mobile-first)
```sass
.foo {
	//styles
	@include above(xs) { ... }				// breakpoint-names: xs, s, m, l, xl, xxl
}
```

**Below** a certain breakpoint (desktop-first)
```sass
.foo {
	//styles
	@include below(xs) { ... }				// breakpoint-names: xs, s, m, l, xl, xxl
}
```

**At** a certain breakpoint<br>
```sass
.foo {
	//styles
	@include at(xs) { ... }					// breakpoint-names: xs, s, m, l, xl, xxl
}
```

**Between** two breakpoints<br>
```sass
.foo {
	//styles
	@include between(xs, m) { ... }			// breakpoint-names: xs, s, m, l, xl, xxl
}
```

###Usage
You can use the breakpoint-mixins in two ways:

Either inside your class-declarations...
```sass
.foo {
	color: red
	@include above(l) { color: blue }
}
```

... or on their own.
```sass
.foo {color: red}
@include above(l) { 
	.foo { color: red }
}
```
Both is fine.

###Play with it
You can test the mixins over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Breakpoint-Playground](http://codepen.io/NilsDannemann/pen/gaoZrE?editors=110)


#Components & Parts

### Base Components

### HFC Components

### Parts
Parts can be used for building your own components.

##### Button
Optional: Define a **title**, a **link**, a **style** and/or a **color**.
- Style: can be "filled", "outlined" or "none". Default: "filled".
- Color: can be "brand" or any of the color variables. Default: "grey".
```Sass
//without variables
{% include components/button/button.html %}
//width variables
{% include components/button/button.html title="MyTitle" link="link" style="filled" color="brand" %}
```
##### Buttongroup
Optional: Define a **style** and/or a **color**.
- Style: can be "filled", "outlined" or "none". Default: "filled".
- Color: can be "brand" or any of the color variables. Default: "grey".
```Sass
//without variables
{% include components/button/buttongroup.html %}
//width variables
{% include components/button/buttongroup.html style="filled" color="brand" %}
```

#Other (in progress)

###Container
**Basic Container**
```sass
@include container();
```

###Flexbox 
**Use Flexbox**
```sass
@include flexbox();
```
