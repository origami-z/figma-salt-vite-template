export type CreatedNodesResultToUIMessage = {
  type: "created-nodes-result";
  success: boolean;
};

export type PostToUIMessage = CreatedNodesResultToUIMessage;

export type CreateTriangleToFigmaMessage = {
  type: "create-rectangles";
  count: number;
};

export type CancelToFigmaMessage = {
  type: "cancel";
};

export type PostToFigmaMessage =
  | CreateTriangleToFigmaMessage
  | CancelToFigmaMessage;
