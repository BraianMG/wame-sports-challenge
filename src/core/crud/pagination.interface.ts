/**
 * Generic pagination interface
 */
export interface IPagination<T> {
  /**
   * Total number of available items
   */
  readonly total?: number;

  /**
   * Items included in the current listing
   */
  readonly items?: T[];
}

export default IPagination;
