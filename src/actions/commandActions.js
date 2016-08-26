import PoshApi from '../api/PoshApi';

export function LoadCommands() {
  return PoshApi.GetAllCommands();
}