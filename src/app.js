let name = 'rk', age=18;
let obj = {
	name,age,
	getName(){return this.name;},
	//表达式作为属性名或是方法名
	['get'+'Age'](){return this.age;}
}