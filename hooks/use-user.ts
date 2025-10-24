"use client";

import { useTaskFlowStore } from "@/store";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export function useUser() {
  const router = useRouter();

  const { currentUser, currentUserId, loading, login, register, logoutFn } =
    useTaskFlowStore(
      useShallow((state) => ({
        currentUser: state.getCurrentUser(),
        currentUserId: state.currentUserId,
        login: state.login,
        register: state.register,
        logoutFn: state.logout,
        loading: state.isLoading,
      }))
    );

  const logout = () => {
    logoutFn();
    router.push("/");
  };

  const isAuthenticated = !!currentUserId;

  return {
    user: currentUser,
    userId: currentUserId,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
  };
}
