import { createContext, useContext, useState, ReactNode,}  from "react";

import invoices from "../data/invoice";
import useLocalStorage from "../components/useLocalStorage";
import { Invoice } from "../types/invoice";

type InvoiceContextType = {
    invoiceData: Invoice[];
    showForm: boolean;
    selectedInvoice: Invoice | null;
    darkMode: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedInvoice: React.Dispatch<
        React.SetStateAction<Invoice | null>
    >;
    setDarkMode: React.Dispatch<
    React.SetStateAction<boolean>
    >;
    handleAddList: (data: Invoice) => void;
    handleUpdateInvoice: (data: Invoice) => void;
    

}

const InvoiceContext = createContext<InvoiceContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function InvoiceProvider({children}: ProviderProps) {
    
    const [showForm, setShowForm] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [invoiceData, setInvoiceData] = useLocalStorage('invoice-app-data', invoices)
    const [darkMode, setDarkMode] = useLocalStorage<boolean>(
      "darkMode",
      false
    );

    function handleAddList(data: Invoice) {
        setInvoiceData((inv) => [...inv, data])
    }

    function handleUpdateInvoice(updatedInvoice: Invoice) {
    setInvoiceData(prev =>
        prev.map(invoice =>
        invoice.id === updatedInvoice.id
            ? updatedInvoice
            : invoice
        )
    );
    }

    return(
        <InvoiceContext.Provider value={{
        invoiceData,
        showForm,
        selectedInvoice,
        darkMode,

        setShowForm,
        setSelectedInvoice,
        setDarkMode,

        handleAddList,
        handleUpdateInvoice,
      }}>
        {children}
        </InvoiceContext.Provider>
    )
}

export function useInvoice() {
    const context = useContext(InvoiceContext)
    if (context ==  undefined)
        throw new Error(
      "useInvoice must be used inside InvoiceProvider"
    );
    return context
}