export interface ChatBubbleI {
    content: string;
    position: string;
    time: string;
    senderName: string;
    img: string;
}
export declare class ChatBubble {
    msg: ChatBubbleI;
    constructor();
}
