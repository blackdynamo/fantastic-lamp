type Allocation = {
  id: string;
};

type Lease = {
  id: string;
  allocations: Allocation[];
};

type Operation = {
  filter: Record<string, unknown>;
  update: Record<string, unknown>;
};

const leases: Lease[] = [{ id: "1", allocations: [{ id: "1" }] }];

const toOperation =
  (id: string) =>
  (allocation: Allocation): Operation => ({
    filter: { id },
    update: { $set: { allocation } },
  });

const toOperations = ({ id, allocations }: Lease) =>
  allocations.map(toOperation(id));

const operations = leases.reduce(
  (a, lease) => a.concat(toOperations(lease)),
  [] as Operation[]
);

for (const lease of leases) {
  for (const allocation of lease.allocations) {
    if (allocation.name) {
      operations.push(createUpdate(lease.id, allocation));
    }
  }
}
