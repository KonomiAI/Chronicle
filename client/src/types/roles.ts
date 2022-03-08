
export default interface Role {
  id: string;
  name: string;
  permissions: Record<string,object>
}