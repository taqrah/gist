export type Gist = {
  _id: string;
  score: number;
  content: string;
  replies: [
    {
      _id: string;
      score: number;
      content: string;
      replyingTo: string;
      user: {
        avatar: string;
        username: string;
      };
      createdAt: string;
    }
  ];
  user: {
    avatar: string;
    username: string;
  };
  createdAt: string;
};

export type Reply = {
  _id: string;
  score: number;
  content: string;
  replyingTo: string;
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
   // score: number;
   replies: Reply[];
 }
 export interface ReplyProps {
   content: string;
   currentUser: boolean;
   replyingTo: string;
   id: string;
   username: string;
   createdAt: string;
   score: number;
 }