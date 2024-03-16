export type Reply = {
  _id: string;
  likes: number;
  content: string;
  replyingTo: string;
  user: {
    avatar: string;
    username: string;
  };
  createdAt: string;
};

export type Gist = {
  _id: string;
  likes: number;
  content: string;
  replies: Reply[]
  user: {
    avatar: string;
    username: string;
  };
  createdAt: string;
};

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface GistProps {
   content: string;
   currentUser: boolean;
   id: string;
   username: string;
   createdAt: string;
   // hasReplies: boolean;
   isAuthenticated: boolean;
   replies: Reply[];
 }
 export interface ReplyProps {
   content: string;
   currentUser: boolean;
   replyingTo: string;
   id: string;
   username: string;
   createdAt: string;
   isAuthenticated: boolean;
   likes: number;
 }