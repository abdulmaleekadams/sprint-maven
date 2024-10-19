const Restriction = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-5">Board Creation</p>
        <div>
          <p className="text-muted-foreground text-sm">
            Workspace member role(s) who can create public boards.
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Workspace member role(s) who can create private boards.
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Workspace member role(s) who can create guest boards.
          </p>
        </div>
      </div>

      <div>
        <p className="mb-5">Board Deletion</p>
        <div>
          <p className="text-muted-foreground text-sm">
            Workspace member role(s) who can delete public boards.
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Workspace member role(s) who can delete private boards.
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Workspace member role(s) who can delete guest boards.
          </p>
        </div>
      </div>
      <p>Invitation</p>
    </div>
  );
};

export default Restriction;
