# HFC Relay - Readme

Coming.


# Component Goals
- Better clickable Areas
- Better accessibility (HTML Outliner)
- Intelligent Behavior (responsive, equal height, text-overflow)
- Intelligent Fallbacks (e.g. no image)
- UI Animations

# Pages

## Create
1. Create your page.md in _pages

##Navigation
1. On parent-page: Set Children to true
2. On child-pages: Implement correct permalink (e.g. /parentpage/childpage)



# Developer Snippets

##Grid

**Use Columns**
```sass
@include column('1/4');					//basic gutters
@include column('1/4', $gutter: 0); 	//optional: no gutters
@include column('1/4', $gutter: 10px); 	//optional: 10px gutters
```

**Use Rows**
```sass
@include row('1/4');					//basic gutters
@include row('1/4', $gutter: 0); 		//optional: no gutters
@include row('1/4', $gutter: 10px); 	//optional: 10px gutters
```

##Breakpoint Management
**Above**
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
**Below**
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
**At**
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
**Between**
```sass
.foo {
	//styles

	@include between(xs, m) { ... }
	@include between(s, xl) { ... }
}
```

##Container
**Basic Container**
```sass
@include container();
```

##Flexbox 

**Use Flexbox** (with Fallback):
Default: flex, row
```sass
@include flexbox($type, $direction);
```


**Flexbox width**:
Default: 50%
```sass
@include flexbox-width($width);
```


**Flexbox order**:
Default: 1 up
```sass
@include flexbox-order($order);
```


