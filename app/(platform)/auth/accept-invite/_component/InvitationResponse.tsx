const InvitationResponse = ({
  response,
}: {
  response:
    | {
        success: boolean;
        message: string;
        data?: undefined;
      }
    | {
        success: boolean;
        data: {
          id: string;
          userId: string;
          workspaceId: string;
          roleId: string;
        };
        message: string;
      };
}) => {
  return <div>{response.message}</div>;
};

export default InvitationResponse;
