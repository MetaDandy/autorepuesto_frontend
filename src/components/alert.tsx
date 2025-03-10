'use client'

import useAppStore from "@/lib/store";
import { motion } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const Alert = () => {
  const { alert } = useAppStore();

  if (!alert) return null;

  return (
    <AlertDialog open={alert.isOpen}>
      <AlertDialogContent asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >

          <AlertDialogHeader>
            <AlertDialogTitle>{alert.title}</AlertDialogTitle>
            <AlertDialogDescription>{alert.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {alert.btnCancel && (
              <AlertDialogCancel asChild>{alert.btnCancel}</AlertDialogCancel>
            )}
            {alert.btnAction && (
              <AlertDialogAction asChild>{alert.btnAction}</AlertDialogAction>
            )}
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default Alert;