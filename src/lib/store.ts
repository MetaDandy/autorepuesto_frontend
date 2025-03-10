import { toast } from "sonner";
import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type Alert = {
  isOpen: boolean;
  title: string;
  description: string | React.ReactElement;
  btnAction?: React.ReactNode;
  btnCancel?: React.ReactNode;
} | false;

type LockScreen = {
  isVisible: boolean;
  type: "jsx" | "reload" | "loading";
  content: string | React.ReactElement;
} | false;

type Modal = {
  isOpen: boolean;
  title: string;
  description: string;
  content: string | React.ReactElement;
  btnAction?: React.ReactNode;
  btnCancel?: React.ReactNode;
} | false;

type AppState = {
  theme: Theme;
  alert: Alert;
  lockScreen: LockScreen;
  modal: Modal;
  setTheme: (theme: Theme) => void;
  setAlert: (alert: Alert) => void;
  setLockScreen: (lock: LockScreen) => void;
  setModal: (modal: Modal) => void;
  showToast: (title: string, description?: string, type?: "success" | "error" | "info") => void;
};

const useAppStore = create<AppState>((set) => ({
  theme: "system",
  alert: false,
  lockScreen: false,
  modal: false,
  setTheme: (theme) => set({ theme }),
  setAlert: (alert) => set({ alert }),
  setLockScreen: (lockScreen) => set({ lockScreen }),
  setModal: (modal) => set({ modal }),
  showToast: (title, description, type = "info") => {
    toast[type](title, { description });
  },
}));

export default useAppStore;
