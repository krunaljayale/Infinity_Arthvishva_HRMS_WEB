import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { User } from 'lucide-react'; // Or your icon library

interface Props {
    name: string;
    label?: string;
}

export const ProfilePhotoUpload = ({ name, label = "PROFILE PHOTO" }: Props) => {
    const { register, setValue, watch } = useFormContext();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a local preview URL
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
            
            // Pass the file to react-hook-form
            setValue(name, file);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500">{label}</span>
            
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-blue transition-colors bg-gray-50 dark:bg-gray-900"
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="image/*"
                />
                
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <User className="w-8 h-8 mb-1" />
                        <span className="text-xs font-medium">Select Photo</span>
                    </div>
                )}
            </div>
        </div>
    );
};