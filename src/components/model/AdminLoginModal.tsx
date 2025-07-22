// components/LoginModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: Props) => {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { memberId, password });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Stronger overlay with heavier blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 backdrop-blur-0"
          enterTo="opacity-100 backdrop-blur-md"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 backdrop-blur-md"
          leaveTo="opacity-0 backdrop-blur-0"
        >
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        </Transition.Child>

        {/* Modal Panel with lighter background for better contrast */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white/30 border border-white/30 backdrop-blur-xl shadow-elegant p-8 text-gray-900 dark:text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-200/40 transition"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              <Dialog.Title className="text-2xl font-semibold text-center mb-6 select-none">
                Member Login
              </Dialog.Title>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="space-y-5"
              >
                <input
                  type="text"
                  placeholder="Admin ID"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-md bg-white/80 px-4 py-3 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-primary transition"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md bg-white/80 px-4 py-3 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-primary transition"
                />

                <Button type="submit" className="w-full py-3 text-lg font-medium">
                  Login
                </Button>
              </form>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};



export default LoginModal;
