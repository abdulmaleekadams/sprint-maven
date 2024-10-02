import { fetchInvitedMembers } from "@/actions/workspaces/fetch-invited-members";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

const InvitationTable = () => {
  const { data: invitations, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetchInvitedMembers();
      if (res.length === 0) return [];
      return res;
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Invited</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="sr-only">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          invitations?.map(({ createdAt, email, roleId, id }) => (
            <TableRow key={id}>
              <TableCell>{email}</TableCell>
              <TableCell>{format(createdAt, "dd-MMM-yy")}</TableCell>
              <TableCell>
                <Select defaultValue={roleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={roleId}>Member</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>roles</DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default InvitationTable;
