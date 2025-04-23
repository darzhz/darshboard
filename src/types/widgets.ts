export interface WidgetInfo {
    name: string
    description: string
    icon: string
}
export interface widget{
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
  
 export interface widgetLayout{
    lg: widget[];
    md: widget[];
    sm: widget[];
    xs: widget[];
  }