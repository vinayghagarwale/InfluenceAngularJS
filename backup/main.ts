//
// main.ts file
//
 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
 
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
 
 
 
//
// app.module.ts file
//
 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IntegralUIModule } from 'integralui-web/integralui.module';
 
@NgModule({
imports: [ BrowserModule, IntegralUIModule ],
declarations: [ AppComponent ],
bootstrap: [ AppComponent ]
})
export class AppModule { }
 
 
 
//
// app.component.ts file
//
 
import { Component, ViewEncapsulation } from '@angular/core';
 
@Component({
selector: 'iui-app',
templateUrl: 'app.template.html',
styleUrls: ['treeview-overview.css'],
encapsulation: ViewEncapsulation.None
})
export class AppComponent {
// An Array object that holds all item objects shown in TreeView
// It is set as a list of any custom objects, you can use any custom fields and data bind them with TreeView using its properties
public items: Array;
 
// Get a reference of application view
@ViewChild('application', {read: ViewContainerRef}) applicationRef: ViewContainerRef;
 
// Editor settings
private isEditActive: boolean = false;
private editItem = null;
private originalText: string = '';
private editorFocused: boolean = false;
private hoverItem = null;
 
// Initialize items in component constructor
constructor(){
this.items = [
{
id: 1,
text: "Favorites",
icon: "computer-icons favorites",
items: [
{ id: 11, pid: 1, text: "Desktop", icon: "computer-icons empty-doc" },
{ id: 12, pid: 1, text: "Downloads", icon: "computer-icons downloads" }
]
},
{
id: 2,
text: "Libraries",
icon: "computer-icons folder",
items: [
{
id: 21,
pid: 2,
text: "Documents",
icon: "computer-icons documents",
expanded: false,
items: [
{ id: 211, pid: 21, text: "My Documents", icon: "computer-icons empty-doc" },
{ id: 212, pid: 21, text: "Public Documents", icon: "computer-icons empty-doc" }
]
},
{ id: 22, pid: 2, text: "Music", icon: "computer-icons music" },
{ id: 23, pid: 2, text: "Pictures", icon: "computer-icons pictures" },
{ id: 24, pid: 2, text: "Videos", icon: "computer-icons videos" }
]
},
{
id: 3,
text: "Computer",
icon: "computer-icons pc",
expanded: false,
items: [
{ id: 31, pid: 3, text: "Local Disk (C:)", icon: "computer-icons disk" },
{ id: 32, pid: 3, text: "Storage (D:)", icon: "computer-icons disk" }
]
},
{ id: 4, text: "Network", icon: "computer-icons network" },
{ id: 5, text: "Recycle Bin", icon: "computer-icons recycle" }
];
}
 
showEditor(item){
this.originalText = item.text;
this.isEditActive = true;
this.editItem = item;
this.editorFocused = true;
}
 
closeEditor(){
this.editItem = null;
this.originalText = '';
this.editorFocused = false;
}
 
editorKeyDown(e){
if (this.editItem){
switch (e.keyCode){
case 13: // ENTER
this.closeEditor();
break;
 
case 27: // ESCAPE
this.editItem.text = this.originalText;
this.closeEditor();
break;
}
}
}
 
editorLostFocus(){
if (this.editItem)
this.editItem.text = this.originalText;
 
this.closeEditor();
}
 
}
 
bootstrap(AppComponent);