<template>
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
        <div v-for="(item, index) in formDynamic.items" :key="index">
          <FormItem
            label="222"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '222', trigger: 'blur'}"
          >
            <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem
            label="888"
            :prop="'items.' + index + '.age'"
            :rules="{required: true, message: '888', trigger: 'blur'}"
          >
            <Input type="text" v-model="item.age" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem
            label="City"
            :prop="'items.' + index + '.city'"
            :rules="{required: true, message: '111', trigger: 'blur'}"
          >
            <Select v-model="item.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
        </div>
        <FormItem>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
            <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                index: 1,
                formDynamic: {
                    items: [
                        {
                            city: '',
                            value: '',
                            age: '',
                            index: 1,
                            status: 1
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    city: '',
                    value: '',
                    age: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>
