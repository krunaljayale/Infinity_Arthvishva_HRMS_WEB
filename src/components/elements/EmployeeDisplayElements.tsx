import { ExternalLink, Download } from 'lucide-react';

interface DataFieldProps {
    label: string;
    value: any;
    displayValue: (val: any) => string;
}

export const DataField = ({ label, value, displayValue }: DataFieldProps) => (
    <div>
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1">
            {label}
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {displayValue(value)}
        </span>
    </div>
);

interface DocumentRowProps {
    title: string;
    fileUrl?: string;
}

export const DocumentRow = ({ title, fileUrl }: DocumentRowProps) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {title}
        </span>
        <div className="flex items-center gap-2">
            {fileUrl ? (
                <>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-blue-200 text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" /> View
                    </a>
                    <a
                        href={fileUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-green-200 text-green-600 bg-green-50/50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        <Download className="w-3 h-3" /> Download
                    </a>
                </>
            ) : (
                <span className="text-xs font-medium text-gray-400 px-3 py-1">
                    Not Uploaded
                </span>
            )}
        </div>
    </div>
);