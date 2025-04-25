import { Layout, Layouts } from "react-grid-layout";

export interface WidgetInfo {
    name: string
    description: string
    icon: string
}
export interface widget extends Layout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
    title?: string;
    value?: number | string;
    icon?: string;
    trend?: string;
    comparedTo?: string;
    content?: string;
    items?: string[];
  }
  
 export interface widgetLayout extends Layouts{
    lg: widget[];
    md: widget[];
    sm: widget[];
    xs: widget[];
    [key: string]: widget[];
  }