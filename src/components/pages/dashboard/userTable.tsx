"use client";

import { useAllMembers, useDeleteMember } from "@/client/hooks/useUsers";
import Loading from "@/components/shared/loading/loading";
import MemberDeleteButton from "./deleteUserButton";

const UserTable = () => {
  const { data: membersData, isLoading } = useAllMembers();
  const {mutate : deleteMember} = useDeleteMember();

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="bg-[#20201f] rounded-xl shadow-sm flex flex-col">
      <div className="header-wrapper self-baseline bg-[#2b2b29] px-10 py-1 rounded-e-lg shadow-sm">
        <h4 className="text-lg sm:text-2xl font-semibold">Manage users</h4>
      </div>
      <div className="table-wrapper py-3 px-3 sm:px-12">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-zinc-500 font-bold uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-zinc-500 font-bold uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-zinc-500 font-bold uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-sm text-zinc-500 font-bold uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-600">
                    {membersData?.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 capitalize">
                          {member.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {member.emailVerified ? "Verified" : "Unverified"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <MemberDeleteButton
                            onDelete={() => deleteMember(member.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
