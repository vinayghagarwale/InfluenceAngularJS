var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, Renderer, ElementRef, ViewEncapsulation, ContentChild, TemplateRef, HostListener } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { includes, pick } from 'lodash-es';
import { deprecatedSelector } from '../deprecated-selector';
var TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement, renderer, elementRef) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        this.renderer = renderer;
        this.elementRef = elementRef;
        deprecatedSelector('Tree', 'tree-root', elementRef);
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = this.renderer.invokeElementMethod($event.target, 'closest', ['Tree']);
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: pick(this, this.treeModel.eventNames)
        });
    };
    return TreeComponent;
}());
__decorate([
    ContentChild('loadingTemplate'),
    __metadata("design:type", TemplateRef)
], TreeComponent.prototype, "loadingTemplate", void 0);
__decorate([
    ContentChild('treeNodeTemplate'),
    __metadata("design:type", TemplateRef)
], TreeComponent.prototype, "treeNodeTemplate", void 0);
__decorate([
    ContentChild('treeNodeFullTemplate'),
    __metadata("design:type", TemplateRef)
], TreeComponent.prototype, "treeNodeFullTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], TreeComponent.prototype, "nodes", null);
__decorate([
    Input(),
    __metadata("design:type", TreeOptions),
    __metadata("design:paramtypes", [TreeOptions])
], TreeComponent.prototype, "options", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TreeComponent.prototype, "focused", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onToggleExpanded", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onActivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onDeactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onFocus", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onBlur", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onUpdateData", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onInitialized", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onMoveNode", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onLoadChildren", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onChangeFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onEvent", void 0);
__decorate([
    HostListener('body: keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeComponent.prototype, "onKeydown", null);
__decorate([
    HostListener('body: mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeComponent.prototype, "onMousedown", null);
TreeComponent = __decorate([
    Component({
        selector: 'Tree, tree-root',
        encapsulation: ViewEncapsulation.None,
        providers: [TreeModel],
        styles: [
            '.tree-children { padding-left: 20px }',
            '.empty-tree-drop-slot .node-drop-slot { height: 20px; min-width: 100px }',
            ".tree {\n      width: 100%;\n      position:relative;\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
        ],
        template: "\n    <tree-viewport>\n      <div\n        class=\"tree\"\n        [class.node-dragging]=\"treeDraggedElement.isDragging()\">\n        <tree-node-collection\n          *ngIf=\"treeModel.roots\"\n          [nodes]=\"treeModel.roots\"\n          [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n        </tree-node-collection>\n        <tree-node-drop-slot\n          class=\"empty-tree-drop-slot\"\n          *ngIf=\"treeModel.isEmptyTree()\"\n          [dropIndex]=\"0\"\n          [node]=\"treeModel.virtualRoot\">\n        </tree-node-drop-slot>\n      </div>\n    </tree-viewport>\n  "
    }),
    __metadata("design:paramtypes", [TreeModel,
        TreeDraggedElement,
        Renderer,
        ElementRef])
], TreeComponent);
export { TreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQ3ZFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUMzRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNELE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBOEM1RCxJQUFhLGFBQWE7SUE0QnhCLHVCQUNTLFNBQW9CLEVBQ3BCLGtCQUFzQyxFQUNyQyxRQUFrQixFQUNsQixVQUFzQjtRQUpoQyxpQkFRQztRQVBRLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFNUIsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDNUUsQ0FBQztJQTNCUSxzQkFBSSxnQ0FBSztRQURs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Q0FBQyxDQUFDOzs7O2dEQU8zQztBQXhEVSxhQUFhO0lBNUN6QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUN0QixNQUFNLEVBQUU7WUFDTix1Q0FBdUM7WUFDdkMsMEVBQTBFO1lBQzFFLHNlQVdFO1NBQ0g7UUFDRCxRQUFRLEVBQUUscXRCQXNCVDtLQUNGLENBQUM7cUNBOEJvQixTQUFTO1FBQ0Esa0JBQWtCO1FBQzNCLFFBQVE7UUFDTixVQUFVO0dBaENyQixhQUFhLENBaUV6QjtTQWpFWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsIEVsZW1lbnRSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBIb3N0TGlzdGVuZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5cbmltcG9ydCB7IGluY2x1ZGVzLCBwaWNrIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCB7IGRlcHJlY2F0ZWRTZWxlY3RvciB9IGZyb20gJy4uL2RlcHJlY2F0ZWQtc2VsZWN0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlLCB0cmVlLXJvb3QnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxuICBzdHlsZXM6IFtcbiAgICAnLnRyZWUtY2hpbGRyZW4geyBwYWRkaW5nLWxlZnQ6IDIwcHggfScsXG4gICAgJy5lbXB0eS10cmVlLWRyb3Atc2xvdCAubm9kZS1kcm9wLXNsb3QgeyBoZWlnaHQ6IDIwcHg7IG1pbi13aWR0aDogMTAwcHggfScsXG4gICAgYC50cmVlIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgcG9zaXRpb246cmVsYXRpdmU7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7IC8qIGlPUyBTYWZhcmkgKi9cbiAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7ICAgLyogQ2hyb21lL1NhZmFyaS9PcGVyYSAqL1xuICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lOyAgICAvKiBLb25xdWVyb3IgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgLyogRmlyZWZveCAqL1xuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAgICAgICAvKiBJRS9FZGdlICovXG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTsgICAgICAgICAgIC8qIG5vbi1wcmVmaXhlZCB2ZXJzaW9uLCBjdXJyZW50bHkgbm90IHN1cHBvcnRlZCBieSBhbnkgYnJvd3NlciAqL1xuICAgIH1gXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRyZWUtdmlld3BvcnQ+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwidHJlZVwiXG4gICAgICAgIFtjbGFzcy5ub2RlLWRyYWdnaW5nXT1cInRyZWVEcmFnZ2VkRWxlbWVudC5pc0RyYWdnaW5nKClcIj5cbiAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXG4gICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwucm9vdHNcIlxuICAgICAgICAgIFtub2Rlc109XCJ0cmVlTW9kZWwucm9vdHNcIlxuICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwie1xuICAgICAgICAgICAgbG9hZGluZ1RlbXBsYXRlOiBsb2FkaW5nVGVtcGxhdGUsXG4gICAgICAgICAgICB0cmVlTm9kZVRlbXBsYXRlOiB0cmVlTm9kZVRlbXBsYXRlLFxuICAgICAgICAgICAgdHJlZU5vZGVGdWxsVGVtcGxhdGU6IHRyZWVOb2RlRnVsbFRlbXBsYXRlXG4gICAgICAgICAgfVwiPlxuICAgICAgICA8L3RyZWUtbm9kZS1jb2xsZWN0aW9uPlxuICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxuICAgICAgICAgIGNsYXNzPVwiZW1wdHktdHJlZS1kcm9wLXNsb3RcIlxuICAgICAgICAgICpuZ0lmPVwidHJlZU1vZGVsLmlzRW1wdHlUcmVlKClcIlxuICAgICAgICAgIFtkcm9wSW5kZXhdPVwiMFwiXG4gICAgICAgICAgW25vZGVdPVwidHJlZU1vZGVsLnZpcnR1YWxSb290XCI+XG4gICAgICAgIDwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvdHJlZS12aWV3cG9ydD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgX25vZGVzOiBhbnlbXTtcbiAgX29wdGlvbnM6IFRyZWVPcHRpb25zO1xuXG4gIEBDb250ZW50Q2hpbGQoJ2xvYWRpbmdUZW1wbGF0ZScpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgndHJlZU5vZGVUZW1wbGF0ZScpIHRyZWVOb2RlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ3RyZWVOb2RlRnVsbFRlbXBsYXRlJykgdHJlZU5vZGVGdWxsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLy8gV2lsbCBiZSBoYW5kbGVkIGluIG5nT25DaGFuZ2VzXG4gIEBJbnB1dCgpIHNldCBub2Rlcyhub2RlczogYW55W10pIHsgfTtcbiAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogVHJlZU9wdGlvbnMpIHsgfTtcblxuICBASW5wdXQoKSBzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHZhbHVlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBvblRvZ2dsZUV4cGFuZGVkO1xuICBAT3V0cHV0KCkgb25BY3RpdmF0ZTtcbiAgQE91dHB1dCgpIG9uRGVhY3RpdmF0ZTtcbiAgQE91dHB1dCgpIG9uRm9jdXM7XG4gIEBPdXRwdXQoKSBvbkJsdXI7XG4gIEBPdXRwdXQoKSBvblVwZGF0ZURhdGE7XG4gIEBPdXRwdXQoKSBvbkluaXRpYWxpemVkO1xuICBAT3V0cHV0KCkgb25Nb3ZlTm9kZTtcbiAgQE91dHB1dCgpIG9uTG9hZENoaWxkcmVuO1xuICBAT3V0cHV0KCkgb25DaGFuZ2VGaWx0ZXI7XG4gIEBPdXRwdXQoKSBvbkV2ZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0cmVlTW9kZWw6IFRyZWVNb2RlbCxcbiAgICBwdWJsaWMgdHJlZURyYWdnZWRFbGVtZW50OiBUcmVlRHJhZ2dlZEVsZW1lbnQsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgIGRlcHJlY2F0ZWRTZWxlY3RvcignVHJlZScsICd0cmVlLXJvb3QnLCBlbGVtZW50UmVmKTtcbiAgICAgIHRyZWVNb2RlbC5ldmVudE5hbWVzLmZvckVhY2goKG5hbWUpID0+IHRoaXNbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYm9keToga2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5ZG93bigkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMudHJlZU1vZGVsLmlzRm9jdXNlZCkgcmV0dXJuO1xuICAgIGlmIChpbmNsdWRlcyhbJ2lucHV0JywgJ3RleHRhcmVhJ10sXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZm9jdXNlZE5vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuXG4gICAgdGhpcy50cmVlTW9kZWwucGVyZm9ybUtleUFjdGlvbihmb2N1c2VkTm9kZSwgJGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6IG1vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKCRldmVudCkge1xuICAgIGNvbnN0IGluc2lkZUNsaWNrID0gdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKCRldmVudC50YXJnZXQsICdjbG9zZXN0JywgWydUcmVlJ10pO1xuXG4gICAgaWYgKCFpbnNpZGVDbGljaykge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcbiAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxuICAgICAgbm9kZXM6IGNoYW5nZXMubm9kZXMgJiYgY2hhbmdlcy5ub2Rlcy5jdXJyZW50VmFsdWUsXG4gICAgICBldmVudHM6IHBpY2sodGhpcywgdGhpcy50cmVlTW9kZWwuZXZlbnROYW1lcylcbiAgICB9KTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=