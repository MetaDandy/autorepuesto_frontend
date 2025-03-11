'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAppStore from "@/lib/store";


export function Modal() {
    const { modal, setModal } = useAppStore();

    if (!modal) return null;

    return (
        <Dialog open={modal.isOpen} onOpenChange={() => setModal(false)}>
            <DialogContent className="sm:max-w-md h-[80%] my-2">
                <DialogHeader>
                    <DialogTitle>{modal.title}</DialogTitle>
                    <DialogDescription>{modal.description}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-auto w-auto ">
                    <div className="flex items-center space-x-2">{modal.content}</div>
                </ScrollArea>
                <DialogFooter className="sm:justify-start">
                    {modal.btnCancel && (
                        <DialogClose asChild>{modal.btnCancel}</DialogClose>
                    )}
                    {modal.btnAction && <>{modal.btnAction}</>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}