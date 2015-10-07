# HFC Relay - Readme

Coming.


# Component Goals
- Better clickable Areas
- Better accessibility (HTML Outliner)
- Intelligent Behavior (responsive, equal height, text-overflow)
- Intelligent Fallbacks (e.g. no image)
- UI Animations

# Creating Pages
1. On Parent: Set Children to true
2. On Children: Implement correct permalink (e.g. /parentpage/childpage)



# Developer Snippets/Includes

##Grid

**Use Columns**
```sass
@include column('1/4');			//basic gutters
@include column('1/4', 0); 		//optional: no gutters
@include column('1/4', 10px); 	//optional: 10px gutters
```

**Use Rows**
```sass
@include row('1/4');			//basic gutters
@include row('1/4', 0); 		//optional: no gutters
@include row('1/4', 10px); 		//optional: 10px gutters
```

##Responsive Rules
**Desktop-first**
```sass
.foo {
	//styles

	@include below(x-small) { //styles }
	@include below(small) { //styles }
	@include below(medium) { //styles }
	@include below(large) { //styles }
	@include below(x-large) { //styles }
}
```
**Mobile-first**
```sass
.foo {
	//styles

	@include above(x-small) { //styles }
	@include above(small) { //styles }
	@include above(medium) { //styles }
	@include above(large) { //styles }
	@include above(x-large) { //styles }
}
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


