import apiClient from 'src/services/apiClient';

export interface RDPItem {
    role_id: number;
    department_id: number;
    permission_id: number;
}

export const rdpService = {
    async getMappings(): Promise<RDPItem[]> {
        const res = await apiClient.get('/role-department-permissions/');
        return res.data;
    },

    buildMatrixAndExisting(data: RDPItem[], roleId: number) {
        const matrix: Record<number, Record<number, boolean>> = {};
        const existing = new Set<string>();

        data
            .filter((item) => item.role_id === roleId)
            .forEach((item) => {
                const key = `${item.department_id}-${item.permission_id}`;
                existing.add(key);

                if (!matrix[item.department_id]) {
                    matrix[item.department_id] = {};
                }

                matrix[item.department_id][item.permission_id] = true;
            });

        return { matrix, existing };
    },

    // 🔥 FINAL FIXED SAVE LOGIC
    async saveMappings(
        roleId: number,
        matrix: Record<number, Record<number, boolean>>,
        existing: Set<string>
    ) {
        const updatedExisting = new Set(existing); // ✅ copy

        for (const deptId in matrix) {
            for (const permId in matrix[deptId]) {
                if (!matrix[deptId][permId]) continue;

                const key = `${deptId}-${permId}`;

                // ❌ skip old ones
                if (existing.has(key)) continue;

                try {
                    await apiClient.post('/role-department-permissions/', {
                        role_id: roleId,
                        department_id: Number(deptId),
                        permission_id: Number(permId),
                    });

                    // ✅ ADD to updated state
                    updatedExisting.add(key);

                } catch (err: any) {
                    // ignore duplicate
                    if (
                        err?.response?.data?.detail?.includes('already assigned')
                    ) {
                        updatedExisting.add(key);
                        continue;
                    }
                    throw err;
                }
            }
        }

        return updatedExisting; // ✅ return updated state
    },
};