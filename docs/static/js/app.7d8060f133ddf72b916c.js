webpackJsonp([1],{"0bC5":function(t,e){},K7BV:function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});o("K3J8"),o("qb6w");var n=o("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this._m(0),this._v(" "),e("router-view")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"header"}},[e("h1",[this._v("todos")])])}]};var r=o("VU/8")({name:"App"},i,!1,function(t){o("K7BV")},null,null).exports,s=o("/ocq"),d=o("Gu7T"),c=o.n(d),l=o("Xxa5"),a=o.n(l),u=o("exGp"),p=o.n(u),f=o("kFye"),v={name:"Todo",props:{todo:Object},data:function(){return{origTodoTitle:null}},computed:{inputTodo:{get:function(){return this.todo},set:function(t){this.$emit("input",t)}}},methods:{editTodo:function(){this.origTodoTitle=this.todo.title,this.$emit("edit-todo",this.todo)},doneEditTodo:function(){this.$emit("done-edit-todo",{id:this.todo.id,title:this.inputTodo.title}),this.origTodoTitle=null},cancelEditTodo:function(){this.$emit("cancel-edit-todo",{id:this.todo.id,origTitle:this.origTodoTitle}),this.origTodoTitle=null}},directives:{"todo-focus":function(t,e){e.value&&t.focus()}}},m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"form-inline"},[o("div",{staticClass:"form-check-inline"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.completed,expression:"todo.completed"}],staticClass:"form-check-input",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.todo.completed)?t._i(t.todo.completed,null)>-1:t.todo.completed},on:{click:function(e){return t.$emit("toggle-todo-complete",t.todo.id)},change:function(e){var o=t.todo.completed,n=e.target,i=!!n.checked;if(Array.isArray(o)){var r=t._i(o,null);n.checked?r<0&&t.$set(t.todo,"completed",o.concat([null])):r>-1&&t.$set(t.todo,"completed",o.slice(0,r).concat(o.slice(r+1)))}else t.$set(t.todo,"completed",i)}}})]),t._v(" "),o("div",{staticClass:"view"},[o("label",{on:{dblclick:t.editTodo}},[t._v(t._s(t.todo.title))])]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.inputTodo.title,expression:"inputTodo.title"},{name:"todo-focus",rawName:"v-todo-focus",value:null!=t.origTodoTitle,expression:"origTodoTitle != null"}],staticClass:"edit",attrs:{type:"text"},domProps:{value:t.inputTodo.title},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doneEditTodo(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancelEditTodo(e)}],input:function(e){e.target.composing||t.$set(t.inputTodo,"title",e.target.value)}}}),t._v(" "),o("span",{staticClass:"pull-right"},[o("button",{staticClass:"btn btn-xs btn-outline-danger btn-rm-todo",on:{click:function(e){return t.$emit("delete-todo",t.todo.id)}}},[t._v("\n    x\n    ")])])])},staticRenderFns:[]};var h=o("VU/8")(v,m,!1,function(t){o("udLv")},null,null).exports,T=o("mtWM"),g=o.n(T),k="http://dot:3000/todos",x={name:"todoList",components:{Todo:h},computed:{filteredTodos:function(){return"active"===this.visibility?this.todos.filter(function(t){return!0!==t.completed}):"completed"===this.visibility?this.todos.filter(function(t){return!0===t.completed}):this.todos}},props:{},data:function(){return{visibility:"all",newTodo:"",editedTodo:null,todos:[]}},created:function(){var t=this;return p()(a.a.mark(function e(){var o;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.get(k);case 3:o=e.sent,t.todos=o.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},methods:{setVisibility:function(t){this.visibility=t},addTodo:function(){var t=this;return p()(a.a.mark(function e(){var o;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.newTodo){e.next=6;break}return e.next=3,g.a.post(k,{id:Object(f.a)(),title:t.newTodo,completed:!1});case 3:o=e.sent,t.todos=[].concat(c()(t.todos),[o.data]),t.newTodo="";case 6:case"end":return e.stop()}},e,t)}))()},toggleTodoComplete:function(t){var e=this;return p()(a.a.mark(function o(){var n;return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return console.log("toggle todo: "+t),o.prev=1,(n=e.todos.find(function(e){return e.id===t})).completed=!n.completed,o.next=6,g.a.patch(k+"/"+t,{completed:n.completed});case 6:o.next=11;break;case 8:o.prev=8,o.t0=o.catch(1),console.log(o.t0);case 11:case"end":return o.stop()}},o,e,[[1,8]])}))()},deleteTodo:function(t){var e=this;return p()(a.a.mark(function o(){var n,i;return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return console.log("msg delete-todo: "+t),o.prev=1,o.next=4,g.a.delete(k+"/"+t);case 4:if(n=o.sent,console.log("delete successful: "+n.status),!(n.status>200)){o.next=9;break}return console.log("Deletion error: "+n.status),o.abrupt("return");case 9:return o.next=11,g.a.get(k);case 11:i=o.sent,e.todos=i.data,o.next=18;break;case 15:o.prev=15,o.t0=o.catch(1),console.log(o.t0);case 18:case"end":return o.stop()}},o,e,[[1,15]])}))()},clearCompleted:function(){},clearAll:function(){},editTodo:function(t){this.editedTodo=t},editTodoTitle:function(t,e){var o=this;return p()(a.a.mark(function n(){var i;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("update todo "+t+" with title: "+e),n.prev=1,(i=o.todos.find(function(e){return e.id===t})).title=e,n.next=6,g.a.patch(k+"/"+t,{title:i.title});case 6:n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),console.log(n.t0);case 11:case"end":return n.stop()}},n,o,[[1,8]])}))()},doneEditTodo:function(t){var e=this;return p()(a.a.mark(function o(){return a.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.editTodoTitle(t.id,t.title);case 2:e.editedTodo=null;case 3:case"end":return o.stop()}},o,e)}))()},cancelEditTodo:function(t){this.todos.find(function(e){return e.id===t.id}).title=t.origTitle,this.editedTodo=null}}},w={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{attrs:{id:"cover"}},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 todo-form text-white"},[o("div",{staticClass:"from-group input-group-lg"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],staticClass:"form-control",attrs:{type:"text",name:"title",placeholder:"Enter New Todo"},domProps:{value:t.newTodo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}})]),t._v(" "),o("div",[o("ul",{staticClass:"list-group todo-list"},t._l(t.filteredTodos,function(e){return o("li",{key:e.id,staticClass:"list-group-item",class:{completed:e.completed,editing:e==t.editedTodo}},[o("Todo",{attrs:{todo:e},on:{"delete-todo":t.deleteTodo,"toggle-todo-complete":t.toggleTodoComplete,"edit-todo":t.editTodo,"done-edit-todo":t.doneEditTodo,"cancel-edit-todo":t.cancelEditTodo}})],1)}),0)]),t._v(" "),o("footer",{staticClass:"footer"},[o("ul",{staticClass:"filters"},[o("li",[o("a",{class:{selected:"all"==t.visibility},attrs:{href:"#"},on:{click:function(e){return t.setVisibility("all")}}},[t._v("All")])]),t._v(" "),o("li",[o("a",{class:{selected:"active"==t.visibility},attrs:{href:"#"},on:{click:function(e){return t.setVisibility("active")}}},[t._v("Active")])]),t._v(" "),o("li",[o("a",{class:{selected:"completed"==t.visibility},attrs:{href:"#"},on:{click:function(e){return t.setVisibility("completed")}}},[t._v("Completed")])])])])])]),t._v(" "),o("h1",{staticStyle:{color:"white"}},[t._v("todo under editing: "+t._s(t.editedTodo))])])])},staticRenderFns:[]};var y=o("VU/8")(x,w,!1,function(t){o("0bC5")},null,null).exports;n.a.use(s.a);var _=new s.a({routes:[{path:"/",name:"ExampleTodo",component:y}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:_,components:{App:r},template:"<App/>"})},qb6w:function(t,e){},udLv:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7d8060f133ddf72b916c.js.map