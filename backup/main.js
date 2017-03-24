//
// main.ts file
//
System.register(['@angular/platform-browser-dynamic', './app.module', '@angular/core', '@angular/platform-browser', './app.component', 'integralui-web/integralui.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var platform_browser_dynamic_1, app_module_1, core_1, platform_browser_1, app_component_1, integralui_module_1, core_2;
    var platform, AppModule, AppComponent;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (integralui_module_1_1) {
                integralui_module_1 = integralui_module_1_1;
            }],
        execute: function() {
            platform = platform_browser_dynamic_1.platformBrowserDynamic();
            platform.bootstrapModule(app_module_1.AppModule);
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, integralui_module_1.IntegralUIModule],
                        declarations: [app_component_1.AppComponent],
                        bootstrap: [app_component_1.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
            AppComponent = (function () {
                // Initialize items in component constructor
                function AppComponent() {
                    // Editor settings
                    this.isEditActive = false;
                    this.editItem = null;
                    this.originalText = '';
                    this.editorFocused = false;
                    this.hoverItem = null;
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
                AppComponent.prototype.showEditor = function (item) {
                    this.originalText = item.text;
                    this.isEditActive = true;
                    this.editItem = item;
                    this.editorFocused = true;
                };
                AppComponent.prototype.closeEditor = function () {
                    this.editItem = null;
                    this.originalText = '';
                    this.editorFocused = false;
                };
                AppComponent.prototype.editorKeyDown = function (e) {
                    if (this.editItem) {
                        switch (e.keyCode) {
                            case 13:
                                this.closeEditor();
                                break;
                            case 27:
                                this.editItem.text = this.originalText;
                                this.closeEditor();
                                break;
                        }
                    }
                };
                AppComponent.prototype.editorLostFocus = function () {
                    if (this.editItem)
                        this.editItem.text = this.originalText;
                    this.closeEditor();
                };
                __decorate([
                    ViewChild('application', { read: ViewContainerRef }), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "applicationRef", void 0);
                AppComponent = __decorate([
                    core_2.Component({
                        selector: 'iui-app',
                        templateUrl: 'app.template.html',
                        styleUrls: ['treeview-overview.css'],
                        encapsulation: core_2.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            bootstrap(app_component_1.AppComponent);
        }
    }
});
//# sourceMappingURL=main.js.map