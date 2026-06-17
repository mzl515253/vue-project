<template>
  <div class="ts-note-container">
    <h1 class="page-title">TypeScript 知识点汇总</h1>
    <el-tabs v-model="activeTab" class="ts-tabs">
      <el-tab-pane label="类型系统" name="type-system">
        <div class="knowledge-point">
          <h2>类型系统</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>TypeScript的类型系统是其核心特性，它允许在编译时检测错误，提高代码质量和可维护性。TypeScript提供了丰富的类型定义，包括基本类型、复杂类型和自定义类型。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'">{{ typeSystemCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>TypeScript的类型系统可以：</p>
            <ul>
              <li>静态类型检查</li>
              <li>类型推断</li>
              <li>类型注解</li>
              <li>接口定义</li>
              <li>泛型支持</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>TypeScript的类型系统在编译时进行类型检查，通过类型注解和类型推断来确保代码的类型安全。它会在编译过程中生成JavaScript代码，同时检查类型错误。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>类型注解不是强制的，但推荐使用</li>
              <li>类型推断可能会导致意外的类型</li>
              <li>复杂类型需要仔细设计</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>TypeScript适用于：</p>
            <ul>
              <li>大型项目</li>
              <li>团队协作</li>
              <li>需要类型安全的应用</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>类型不匹配</li>
              <li>空值检查</li>
              <li>类型断言错误</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="接口" name="interface">
        <div class="knowledge-point">
          <h2>接口</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>接口是TypeScript中用于定义对象结构的重要特性，它可以描述对象的形状，指定对象应该包含哪些属性和方法。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ interfaceCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>接口可以：</p>
            <ul>
              <li>定义对象结构</li>
              <li>继承其他接口</li>
              <li>定义函数类型</li>
              <li>定义索引类型</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>接口在TypeScript中只是一种类型约束，不会生成任何JavaScript代码。它只在编译时进行类型检查。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>接口不能被实例化</li>
              <li>接口可以被类实现</li>
              <li>接口可以扩展其他接口</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>接口适用于：</p>
            <ul>
              <li>定义对象结构</li>
              <li>实现多态</li>
              <li>代码契约</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>接口属性缺失</li>
              <li>接口方法实现错误</li>
              <li>接口继承循环</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="泛型" name="generics">
        <div class="knowledge-point">
          <h2>泛型</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>泛型是TypeScript中用于创建可重用组件的特性，它允许在定义函数、接口或类时使用类型参数。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ genericsCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>泛型可以：</p>
            <ul>
              <li>创建可重用的组件</li>
              <li>保持类型安全</li>
              <li>提高代码可读性</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>泛型在编译时会被替换为具体的类型，生成的JavaScript代码中不会包含泛型信息。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>泛型参数命名通常使用大写字母</li>
              <li>可以使用多个泛型参数</li>
              <li>可以为泛型参数设置默认类型</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>泛型适用于：</p>
            <ul>
              <li>集合类</li>
              <li>工具函数</li>
              <li>组件库</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>泛型约束错误</li>
              <li>泛型参数使用错误</li>
              <li>泛型推断失败</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联合类型" name="union">
        <div class="knowledge-point">
          <h2>联合类型</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>联合类型允许一个值可以是多种类型中的一种，使用 | 符号分隔不同的类型。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ unionCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>联合类型可以：</p>
            <ul>
              <li>表示值的多种可能类型</li>
              <li>与类型守卫一起使用</li>
              <li>实现更灵活的类型定义</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>联合类型在编译时会进行类型检查，确保值符合其中一种类型。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>联合类型的成员必须有共同的属性才能被访问</li>
              <li>需要使用类型守卫来缩小类型范围</li>
              <li>联合类型可以与字面量类型结合使用</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>联合类型适用于：</p>
            <ul>
              <li>参数可能有多种类型的情况</li>
              <li>状态管理</li>
              <li>配置选项</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>访问联合类型中不存在的属性</li>
              <li>类型守卫使用错误</li>
              <li>联合类型过于复杂</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交叉类型" name="intersection">
        <div class="knowledge-point">
          <h2>交叉类型</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>交叉类型允许将多个类型合并为一个类型，使用 & 符号连接不同的类型。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ intersectionCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>交叉类型可以：</p>
            <ul>
              <li>合并多个类型的属性</li>
              <li>创建更复杂的类型</li>
              <li>实现类型的组合</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>交叉类型在编译时会将多个类型的属性合并为一个新的类型。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>交叉类型会合并所有属性</li>
              <li>如果有冲突的属性，类型会变得复杂</li>
              <li>交叉类型与联合类型的区别</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>交叉类型适用于：</p>
            <ul>
              <li>组合多个类型</li>
              <li>扩展现有类型</li>
              <li>类型混入</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>属性冲突</li>
              <li>类型过于复杂</li>
              <li>使用不当导致类型错误</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="类型断言" name="assertion">
        <div class="knowledge-point">
          <h2>类型断言</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>类型断言允许开发者覆盖TypeScript的类型推断，告诉编译器某个值的具体类型。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ assertionCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>类型断言可以：</p>
            <ul>
              <li>覆盖类型推断</li>
              <li>访问类型的特定属性</li>
              <li>处理any类型</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>类型断言只是编译时的语法，不会影响运行时的行为。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>类型断言不会进行运行时检查</li>
              <li>使用as语法更推荐</li>
              <li>非空断言操作符(!)的使用</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>类型断言适用于：</p>
            <ul>
              <li>处理any类型</li>
              <li>访问DOM元素</li>
              <li>处理复杂的类型推断</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>类型断言错误导致运行时异常</li>
              <li>过度使用类型断言</li>
              <li>非空断言使用不当</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="类型守卫" name="guard">
        <div class="knowledge-point">
          <h2>类型守卫</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>类型守卫是一种在运行时检查类型的方法，它可以帮助TypeScript在条件分支中推断更精确的类型。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ guardCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>类型守卫可以：</p>
            <ul>
              <li>缩小类型范围</li>
              <li>提高类型安全性</li>
              <li>使代码更清晰</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>类型守卫通过运行时检查来确定变量的具体类型，TypeScript会根据这些检查来缩小类型范围。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>类型守卫函数需要返回布尔值</li>
              <li>类型守卫函数的返回类型是类型谓词</li>
              <li>可以使用typeof、instanceof、in等操作符</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>类型守卫适用于：</p>
            <ul>
              <li>处理联合类型</li>
              <li>类型推断</li>
              <li>运行时类型检查</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>类型守卫函数实现错误</li>
              <li>类型谓词使用错误</li>
              <li>类型守卫逻辑错误</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="模块" name="module">
        <div class="knowledge-point">
          <h2>模块</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>TypeScript中的模块系统允许将代码组织成独立的文件，通过导入和导出来共享代码。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ moduleCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>模块系统可以：</p>
            <ul>
              <li>组织代码结构</li>
              <li>避免命名冲突</li>
              <li>提高代码可维护性</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>TypeScript的模块系统基于ES模块标准，通过import和export关键字来实现模块的导入和导出。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>每个文件都是一个模块</li>
              <li>模块中的变量默认是私有的</li>
              <li>可以使用默认导出和命名导出</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>模块适用于：</p>
            <ul>
              <li>大型项目</li>
              <li>代码复用</li>
              <li>团队协作</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>导入路径错误</li>
              <li>导出语法错误</li>
              <li>循环依赖</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="命名空间" name="namespace">
        <div class="knowledge-point">
          <h2>命名空间</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>命名空间是TypeScript中用于组织代码的另一种方式，它可以避免命名冲突。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ namespaceCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>命名空间可以：</p>
            <ul>
              <li>组织代码</li>
              <li>避免命名冲突</li>
              <li>提供命名空间作用域</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>命名空间在编译时会被转换为JavaScript中的对象，用于组织代码。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>命名空间使用namespace关键字</li>
              <li>需要使用export关键字导出成员</li>
              <li>命名空间可以嵌套</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>命名空间适用于：</p>
            <ul>
              <li>组织相关代码</li>
              <li>避免全局命名冲突</li>
              <li>传统项目</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>忘记导出成员</li>
              <li>命名空间嵌套过深</li>
              <li>与模块混淆</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="装饰器" name="decorator">
        <div class="knowledge-point">
          <h2>装饰器</h2>
          <div class="section">
            <h3>说明介绍</h3>
            <p>装饰器是TypeScript中用于修改类、方法、属性或参数的元编程特性。</p>
          </div>
          <div class="section">
            <h3>代码示例</h3>
            <pre><code  v-prism="'typescript'" class="typescript">{{ decoratorCode }}</code></pre>
          </div>
          <div class="section">
            <h3>功能展示说明</h3>
            <p>装饰器可以：</p>
            <ul>
              <li>修改类的行为</li>
              <li>添加元数据</li>
              <li>实现AOP编程</li>
            </ul>
          </div>
          <div class="section">
            <h3>原理</h3>
            <p>装饰器是一种特殊类型的声明，它可以被附加到类声明、方法、属性或参数上，以修改类的行为。</p>
          </div>
          <div class="section">
            <h3>注意点</h3>
            <ul>
              <li>装饰器需要启用experimentalDecorators选项</li>
              <li>装饰器执行顺序有特定规则</li>
              <li>装饰器可以是函数或类</li>
            </ul>
          </div>
          <div class="section">
            <h3>使用场景</h3>
            <p>装饰器适用于：</p>
            <ul>
              <li>框架开发</li>
              <li>元编程</li>
              <li>代码增强</li>
            </ul>
          </div>
          <div class="section">
            <h3>常见错误</h3>
            <ul>
              <li>装饰器语法错误</li>
              <li>装饰器执行顺序错误</li>
              <li>装饰器功能实现错误</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('type-system');

// 代码示例
const typeSystemCode = `// 基本类型
let age: number = 25;
let name: string = 'John';
let isActive: boolean = true;
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 数组类型
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ['a', 'b', 'c'];

// 对象类型
let person: {
  name: string;
  age: number;
  isActive?: boolean; // 可选属性
} = {
  name: 'John',
  age: 25
};

// 函数类型
function add(a: number, b: number): number {
  return a + b;
}

// 类型别名
type User = {
  id: number;
  name: string;
  email: string;
};`;

const interfaceCode = `// 接口定义
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
  readonly createdAt: Date; // 只读属性
}

// 接口继承
interface Admin extends User {
  role: 'admin' | 'superadmin';
  permissions: string[];
}

// 函数接口
interface GreetFunction {
  (name: string): string;
}

// 使用接口
const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  createdAt: new Date()
};

const admin: Admin = {
  id: 2,
  name: 'Admin',
  email: 'admin@example.com',
  createdAt: new Date(),
  role: 'admin',
  permissions: ['read', 'write', 'delete']
};`;

const genericsCode = `// 泛型函数
function identity<T>(value: T): T {
  return value;
}

// 使用泛型函数
const numberValue = identity<number>(42);
const stringValue = identity<string>('Hello');

// 泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
}

// 泛型类
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

// 使用泛型类
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);

const stringStack = new Stack<string>();
stringStack.push('a');
stringStack.push('b');`;

const unionCode = `// 联合类型
let value: string | number | boolean;

value = 'Hello'; // 有效
value = 42; // 有效
value = true; // 有效
// value = []; // 无效

// 联合类型与类型守卫
function processValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}

// 字面量联合类型
type Direction = 'up' | 'down' | 'left' | 'right';

function move(direction: Direction): void {
  console.log(\`Moving \${direction}\`);
}

move('up'); // 有效
// move('diagonal'); // 无效`;

const intersectionCode = `// 交叉类型
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: number;
  department: string;
}

// 交叉类型
type EmployeePerson = Person & Employee;

// 使用交叉类型
const employee: EmployeePerson = {
  name: 'John',
  age: 30,
  employeeId: 12345,
  department: 'IT'
};

// 交叉类型与联合类型的区别
// 联合类型：满足其中一个类型即可
// 交叉类型：同时满足所有类型`;

const assertionCode = `// 类型断言
// 方式1：尖括号语法
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;

// 方式2：as语法
let anotherValue: any = 'another string';
let anotherLength: number = (anotherValue as string).length;

// 类型断言与类型转换的区别
// 类型断言：编译时的类型检查
// 类型转换：运行时的类型转换

// 非空断言
function getLength(str: string | null | undefined): number {
  return str!.length; // 断言str不为null或undefined
}

// 确定赋值断言
let x: number;
// console.log(x); // 错误：变量x在赋值前使用

let y!: number; // 确定赋值断言
console.log(y); // 不会报错，但运行时会是undefined`;

const guardCode = `// 类型守卫
// 1. typeof 类型守卫
function processValue(value: string | number): void {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// 2. instanceof 类型守卫
class Animal {
  speak() {
    console.log('Animal speaks');
  }
}

class Dog extends Animal {
  bark() {
    console.log('Dog barks');
  }
}

function handleAnimal(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark(); // 类型缩小为Dog
  } else {
    animal.speak(); // 类型为Animal
  }
}

// 3. 自定义类型守卫
interface Cat {
  meow: () => void;
}

interface Dog {
  bark: () => void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return 'meow' in animal;
}

function handlePet(pet: Cat | Dog) {
  if (isCat(pet)) {
    pet.meow();
  } else {
    pet.bark();
  }
}`;

const moduleCode = `// 模块导出
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// 模块导入
// app.ts
import { add, subtract, PI } from './math';

console.log(add(1, 2)); // 3
console.log(subtract(5, 3)); // 2
console.log(PI); // 3.14159

// 默认导出
// utils.ts
export default function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// 导入默认导出
import greet from './utils';
console.log(greet('John')); // Hello, John!`;

const namespaceCode = `// 命名空间
namespace Math {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }
}

namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export function distance(p1: Point, p2: Point): number {
    return Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
  }
}

// 使用命名空间
const sum = Math.add(1, 2);
const point1: Geometry.Point = { x: 0, y: 0 };
const point2: Geometry.Point = { x: 3, y: 4 };
const dist = Geometry.distance(point1, point2);

// 命名空间与模块的区别
// 命名空间：内部模块，使用namespace关键字
// 模块：外部模块，使用import/export`;

const decoratorCode = `// 装饰器
// 1. 类装饰器
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return \`Hello, \${this.greeting}!\`;
  }
}

// 2. 方法装饰器
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @enumerable(false)
  get fullName() {
    return this.name;
  }
}

// 3. 属性装饰器
function format(format: string) {
  return function (target: any, propertyKey: string) {
    // 实现逻辑
  };
}

class Product {
  @format('currency')
  price: number;
  constructor(price: number) {
    this.price = price;
  }
}

// 4. 参数装饰器
function required(target: any, propertyKey: string, parameterIndex: number) {
  // 实现逻辑
}

class User {
  constructor(@required name: string) {
    // 实现逻辑
  }
}`;
</script>

<style lang="scss" scoped>
.ts-note-container {
  padding: 20px;
  max-width: 1300px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.ts-tabs {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
}

:deep(.el-tabs__header) {
  margin-bottom: 30px;
}

:deep(.el-tabs__content) {
  min-height: 600px;
}

.knowledge-point {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.knowledge-point h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #666;
}

.section p {
  line-height: 1.6;
  color: #666;
}

.section ul {
  padding-left: 20px;
  line-height: 1.6;
  color: #666;
}

.section li {
  margin-bottom: 5px;
}

</style>