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
You can test the grid over here:<br>
[Grid-Playground](http://codepen.io/NilsDannemann/pen/NGwmqq?editors=110)


#Responsive Workflow
Four sets of sass-mixins to control the responsive flow of your document:

1. **Above** - Example:``` @include above(breakpoint-name) { ... } ```
2. **Below** - Example:``` @include below(breakpoint-name) { ... } ```
3. **At** - Example:``` @include at(breakpoint-name) { ... } ```
4. **From** - Example:``` @include from(breakpoint-name, breakpoint-name) { ... } ```

###Options

#####Above
Styles apply to all withs **above** the breakpoint you pass.<br>
Recommended for: a mobile-first approach.
```sass
.foo {
	//styles
	@include above(xs) { ... }				// breakpoint-names: xs, s, m, l, xl, xxl
}
```

#####Below
Styles apply to all withs **below** the breakpoint you pass.<br>
Recommended for: a desktop-first approach.
```sass
.foo {
	//styles
	@include below(xs) { ... }				// breakpoint-names: xs, s, m, l, xl, xxl
}
```

#####At
Styles apply only **at** the breakpoint you pass.<br>
```sass
.foo {
	//styles
	@include at(xs) { ... }					// breakpoint-names: xs, s, m, l, xl, xxl
}
```

#####Between
Styles apply **between** the two breakpoint you pass.<br>
```sass
.foo {
	//styles
	@include between(xs, m) { ... }			// breakpoint-names: xs, s, m, l, xl, xxl
}
```

###Flexible Usage
You can use the breakpoint-mixins in two ways:

1. Inside your class-declarations: <br>
```sass
.foo {
	color: red
	@include above(l) { color: blue }
}
```

2. On their own: <br>
```sass
.foo {color: red}
@include above(l) { 
	.foo {color: red}
}
```
Both is fine.

###Play with it
You can test the breakpoint management over here:<br>
[Grid-Playground](http://codepen.io/NilsDannemann/pen/NGwmqq?editors=110)


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
