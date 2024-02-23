import { Container } from "@/components/Container";
import { useForm } from "react-hook-form";

export default function Component() {
  const form = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="border border-gray-200 rounded-lg dark:border-gray-800 shadow-lg">
            <div className="grid grid-cols-3">
              <button className="inline-flex items-center justify-center w-full h-14 text-sm font-medium rounded-tl-lg rounded-bl-lg border-r border-gray-200 dark:border-gray-800 bg-gray-50/40 backdrop-blur-10 hover:bg-gray-50/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-800/40 dark:hover:bg-gray-800/50 dark:focus-visible:ring-gray-300">
                Overview
              </button>
              <button className="inline-flex items-center justify-center w-full h-14 text-sm font-medium border-r border-gray-200 dark:border-gray-800 backdrop-filter backdrop-blur-10 hover:bg-gray-50/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:hover:bg-gray-800/50 dark:focus-visible:ring-gray-300">
                Features
              </button>
              <button className="inline-flex items-center justify-center w-full h-14 text-sm font-medium rounded-tr-lg rounded-br-lg border-r border-gray-200 dark:border-gray-800 backdrop-filter backdrop-blur-10 hover:bg-gray-50/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:hover:bg-gray-800/50 dark:focus-visible:ring-gray-300">
                Pricing
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-1.5">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Rent vs Buy House Calculator 🏠{" "}
                </h1>
                <p className=" text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Is it more economical to rent or to buy? Use the rent vs buy
                  calculator to find out the best option for you. We will
                  provide customized information based on the information you
                  provide{" "}
                </p>
              </div>
              <div className=" grid md:grid-cols-2 gap-2 lg:gap-6 grid-cols-1">
                <div className="border border-gray-200 rounded-lg dark:border-gray-800 shadow-lg max-w-md">
                  {/* <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-2/3 space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form> */}
                </div>
                <div className="border border-gray-200 rounded-lg dark:border-gray-800 shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
