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

###Above
Styles apply to all withs **above** the breakpoint you pass along.<br>
Recommended for: a mobile-first approach.
```sass
.foo {
	//styles

	@include above(xs) { ... }
	@include above(s) { ... }
	@include above(m) { ... }
	@include above(l) { ... }
	@include above(xl) { ... }
	@include above(xxl) { ... }
}
```

###Below
Styles apply to all withs **below** the breakpoint you pass along.<br>
Recommended for: a desktop-first approach.
```sass
.foo {
	//styles

	@include below(xs) { ... }
	@include below(s) { ... }
	@include below(m) { ... }
	@include below(l) { ... }
	@include below(xl) { ... }
	@include below(xxl) { ... }
}
```

###At
Styles apply only to the breakpoint you pass along.<br>
```sass
.foo {
	//styles

	@include at(xs) { ... }
	@include at(s) { ... }
	@include at(m) { ... }
	@include at(l) { ... }
	@include at(xl) { ... }
	@include at(xxl) { ... }
}
```

###Between
Styles apply **between** the two breakpoint you pass along.<br>
```sass
.foo {
	//styles

	@include between(xs, m) { ... }
	@include between(s, xl) { ... }
}
```



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
