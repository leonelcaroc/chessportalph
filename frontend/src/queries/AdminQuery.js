import { useQuery, useMutation, useQueryClient } from "react-query";
import { adminApi } from "../services/api";

const queryClient = useQueryClient();

function useAdmins() {
  return useQuery("admins", async () => {
    const { data } = await adminApi.get("/");
    return data;
  });
}

function useCreateAdmin() {
  return useMutation(
    async (payload) => {
      const { data } = await adminApi.post("/register", payload);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admins");
      },
    }
  );
}

function useLoginAdmin() {
  return useMutation(
    async (payload) => {
      const { data } = await adminApi.post("/auth", payload);
      return data;
    },
    {
      onSuccess: () => {
        // Perform any necessary actions upon successful login
      },
    }
  );
}

function useAdminById(id) {
  return useQuery(["admin", id], async () => {
    const { data } = await adminApi.get(`/${id}`);
    return data;
  });
}

function useUpdateAdmin() {
  return useMutation(
    async ({ id, updatedAdmin }) => {
      const { data } = await adminApi.put(`/${id}`, updatedAdmin);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admins");
      },
    }
  );
}

function useDeleteAdmin() {
  return useMutation(
    async (id) => {
      await adminApi.delete(`/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admins");
      },
    }
  );
}

export {
  useAdmins,
  useCreateAdmin,
  useLoginAdmin,
  useAdminById,
  useUpdateAdmin,
  useDeleteAdmin,
};
