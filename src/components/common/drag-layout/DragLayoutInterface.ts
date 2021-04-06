export interface HorizontalNode {
  type: 'horizontal';
  children: (BasisNode)[];
  basis?: number;
  fluid?: true;
  fixed?: false;
}

export interface VerticalNode {
  type: 'vertical';
  children: (BasisNode)[];
  basis?: number;
  fluid?: boolean;
  fixed?: boolean;
}

export interface TabsNode {
  type: 'tabs';
  basis?: number;
  fluid?: boolean;
  fixed?: boolean;
  children: TabNode[];
}

export interface MainNode {
  type: 'main';
  name: string;
}

export interface TabNode {
  type: 'tab';
  label: string;
  name: string;
}

export type BasisNode = HorizontalNode | VerticalNode | TabsNode
export type LayoutNode = HorizontalNode | VerticalNode | TabsNode | MainNode | TabNode
